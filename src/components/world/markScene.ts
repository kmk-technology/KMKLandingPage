import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { MarkRect } from "../../lib/ready";
import { buildMark } from "./logoGeometry";

/*
 * One object, many beats (after Oryzo / Hubtown): the official KMK mark is the only 3D element
 * on the page. It is lit like a product shot (key, rim and fill lights over a studio reflection)
 * and carried through the page: each section defines a pose, and the scroll moves the mark from
 * pose to pose with weighted, inertial easing. The canvas is transparent so the page colour
 * shows through.
 *
 * On phones the poses give way to anchors: an empty slot at the top of each section. The mark
 * sits in the slot nearest the middle of the screen, scrolls with it, and glides (with a small
 * dip and turn) to the next slot as the page moves on, so it follows the reader without ever
 * covering text.
 *
 * Until play() it holds still, facing the viewer at its hero position, so the preloader's 2D
 * logo can land on it (frontRect) and dissolve; then it turns into its first pose.
 */

export type Pose = {
  x: number;
  y: number;
  scale: number;
  ry: number;
  rx: number;
};
export type MarkScene = {
  setPoses: (p: Pose[]) => void;
  /** Phones: screen boxes (CSS px) of the slots the mark travels between, in page order. */
  setAnchors: (get: () => DOMRect[]) => void;
  setProgress: (u: number) => void;
  setPointer: (x: number, y: number) => void;
  setRunning: (on: boolean) => void;
  play: () => void;
  show: () => void;
  frontRect: () => MarkRect;
  dispose: () => void;
};

const HEIGHT = 3;
const BEVEL = 0.07;

export async function createMarkScene(
  canvas: HTMLCanvasElement,
  still: boolean,
): Promise<MarkScene> {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);
  camera.updateMatrixWorld();

  // product-shot lighting
  const key = new THREE.SpotLight(0xffffff, 60, 40, Math.PI / 5, 0.8, 1.4);
  key.position.set(5, 7, 9);
  const rim = new THREE.DirectionalLight(0xa9c4ff, 2.2);
  rim.position.set(-6, 3, -6);
  const fill = new THREE.DirectionalLight(0xffffff, 0.8);
  fill.position.set(-4, -2, 6);
  scene.add(key, key.target, rim, fill, new THREE.AmbientLight(0xffffff, 0.35));

  // the mark: faces carry the official logo image (crisp letters), sides are glossy blue
  const { geo, texture, front } = await buildMark(
    HEIGHT,
    0.5,
    BEVEL,
    renderer.capabilities.getMaxAnisotropy(),
  );
  // the face shows the logo in its true colours (emitted, not lit) under a soft glossy coat,
  // so it matches the flat logo the loader hands over and stays clean at every angle
  const face = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    emissive: 0xffffff,
    emissiveMap: texture,
    roughness: 0.4,
    clearcoat: 0.35,
    clearcoatRoughness: 0.3,
    envMapIntensity: 0.3,
  });
  face.toneMapped = false;
  const side = new THREE.MeshPhysicalMaterial({
    color: 0x3f73e0,
    roughness: 0.28,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  });
  const body = new THREE.Mesh(geo, [face, side]);
  const mark = new THREE.Group();
  mark.add(body);
  scene.add(mark);
  geo.computeBoundingBox();
  const box = geo.boundingBox!;

  // soft contact shadow below
  const sh = document.createElement("canvas");
  sh.width = sh.height = 128;
  const sc = sh.getContext("2d")!;
  const g = sc.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(30,60,140,0.3)");
  g.addColorStop(1, "rgba(30,60,140,0)");
  sc.fillStyle = g;
  sc.fillRect(0, 0, 128, 128);
  const shadowTex = new THREE.CanvasTexture(sh);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
  });
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 1.3), shadowMat);
  shadow.rotation.x = -Math.PI / 2.4;
  scene.add(shadow);

  let poses: Pose[] = [{ x: 0, y: 0, scale: 1, ry: 0, rx: 0 }];
  let target = 0;
  let cur = 0;
  let px = 0;
  let py = 0;
  const pc = { x: 0, y: 0 };
  let halfW = 4;
  let halfH = 3;
  let mobile = false;

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    halfH =
      camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    halfW = halfH * camera.aspect;
    mobile = camera.aspect < 0.9;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // compile now so the first frames never stall
  await renderer.compileAsync(scene, camera);

  const ease = (f: number) => f * f * (3 - 2 * f);
  const clock = new THREE.Clock();
  let time = 0;
  let playing = still;
  let shown = still; // hidden under the loader until its logo lands on the spot
  let intro = still ? 1 : 0;
  let raf = 0;
  let running = false;

  let anchors: (() => DOMRect[]) | null = null;
  /** World placement filling an anchor box: centred on it, its face exactly the box height. */
  const fromBox = (b: DOMRect) => {
    const r = canvas.getBoundingClientRect();
    const z = camera.position.z;
    const ty = (0.5 - (b.top + b.height / 2 - r.top) / r.height) * 2 * halfH;
    const ts = ((b.height / r.height) * 2 * halfH) / HEIGHT;
    // the face sits in front of the z = 0 plane, so it looks a little larger; compensate
    const s = (z * ts) / (z + front * ts);
    return { x: 0, y: (ty * (z - front * s)) / z, s };
  };

  /** Hero placement (pose 0) in world units: where the mark sits before and right after the handoff. */
  const heroPlace = () => {
    const p = poses[0];
    const first = mobile ? anchors?.()[0] : undefined;
    if (first) return fromBox(first);
    return mobile
      ? { x: 0, y: halfH * 0.1, s: p.scale * 0.5 }
      : { x: p.x * halfW, y: p.y * halfH, s: p.scale };
  };

  // phones: the mark is pinned to one anchor slot and scrolls with it, exactly like an image in
  // the page. It moves on to the next slot only once the current one has left the screen at the
  // top, and pops in there with a small turn, so it never slides across the text.
  let slot = -1;
  let pop = 1;
  const follow = (dt: number) => {
    const boxes = anchors?.() ?? [];
    if (!boxes.length) return null;
    let next = boxes.findIndex((b) => b.bottom > 0);
    if (next < 0) next = boxes.length - 1;
    if (next !== slot) {
      if (slot >= 0 && !still) pop = 0;
      slot = next;
    }
    pop = Math.min(1, pop + dt / 0.8);
    const c1 = 1.70158;
    const back = 1 + (c1 + 1) * (pop - 1) ** 3 + c1 * (pop - 1) ** 2; // ease-out-back
    const goal = fromBox(boxes[slot]);
    return { y: goal.y, s: goal.s * back, spin: (1 - pop) * 1.6 };
  };

  const draw = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    if (playing) {
      intro = Math.min(1, intro + dt / 1.6);
      if (!still) time += dt;
    }
    const k = still ? 1 : 1 - Math.pow(0.002, dt); // weighted follow
    cur += (target - cur) * k;
    const last = poses.length - 1;
    const u = THREE.MathUtils.clamp(cur, 0, last);
    const i = Math.min(Math.floor(u), Math.max(0, last - 1));
    const f = last > 0 ? ease(u - i) : 0;
    const a = poses[i];
    const b = poses[Math.min(i + 1, last)];
    const lerp = (p: number, q: number) => p + (q - p) * f;
    // poses are in screen fractions (x: -1 left edge … 1 right edge);
    // phones: the mark rides the anchor slots instead
    const ride = mobile ? follow(dt) : null;
    const x = ride ? 0 : lerp(a.x, b.x) * halfW;
    const y = ride ? ride.y : lerp(a.y, b.y) * halfH;
    const s = ride ? ride.s : lerp(a.scale, b.scale);
    const spin = ride?.spin ?? 0;
    mark.visible = shadow.visible = shown && s > 0.005;
    pc.x += (px - pc.x) * k * 0.5;
    pc.y += (py - pc.y) * k * 0.5;

    // entrance: from facing the viewer (where the loader logo landed) into the pose, with a turn
    const ie = 1 - Math.pow(1 - intro, 3);
    const turn = Math.sin(ie * Math.PI) * 0.6;
    mark.position.set(x, y + Math.sin(time * 0.8) * 0.08 * ie, 0);
    mark.scale.setScalar(s);
    mark.rotation.set(
      (lerp(a.rx, b.rx) - pc.y * 0.25) * ie,
      (lerp(a.ry, b.ry) + pc.x * 0.5 + Math.sin(time * 0.45) * 0.12 + spin) *
        ie -
        turn,
      0,
    );
    shadow.position.set(x, y - (HEIGHT / 2 + 0.8) * s, 0);
    shadow.scale.setScalar(s);
    shadowMat.opacity = ie;
    key.target.position.set(x, y, 0);
    renderer.render(scene, camera);
  };
  const frame = () => {
    raf = requestAnimationFrame(frame);
    draw();
  };

  const v = new THREE.Vector3();
  return {
    setPoses: (p) => (poses = p.length ? p : poses),
    setAnchors: (get) => (anchors = get),
    setProgress: (val) => (target = val),
    setPointer: (x, y) => {
      px = x;
      py = y;
    },
    setRunning: (on) => {
      if (on === running) return;
      running = on;
      if (on) {
        clock.getDelta();
        frame();
      } else cancelAnimationFrame(raf);
    },
    play: () => {
      playing = shown = true;
    },
    show: () => {
      shown = true;
    },
    // screen rectangle (CSS px) of the logo face while the mark faces the viewer at its hero spot
    frontRect: () => {
      // may be asked before the first frame is drawn: make sure the camera matrices are current
      camera.updateMatrixWorld();
      const hero = heroPlace();
      const r = canvas.getBoundingClientRect();
      // the bevel adds a rim around the face; the face itself is exactly the logo image
      const corner = (bx: number, by: number) => {
        v.set(
          hero.x + bx * hero.s,
          hero.y + by * hero.s,
          front * hero.s,
        ).project(camera);
        return [
          r.left + ((v.x + 1) / 2) * r.width,
          r.top + ((1 - v.y) / 2) * r.height,
        ];
      };
      const [x0, y0] = corner(box.min.x + BEVEL, box.max.y - BEVEL);
      const [x1, y1] = corner(box.max.x - BEVEL, box.min.y + BEVEL);
      return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      texture.dispose();
      shadowTex.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
