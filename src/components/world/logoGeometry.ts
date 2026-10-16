import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/*
 * The official KMK mark as a 3D object. The badge is a regular pointy-top hexagon with rounded
 * corners; it is built analytically (true arcs, not traced pixels) and fitted to the official
 * high-resolution logo (/logo/kmk/logo-mark-hd.png, a tight crop of logo-nbg.png): the flat sides
 * set the size, the clipped height sets the corner radius. The logo image is mapped onto the
 * front and back faces, so the KMK letters are exactly the original artwork, and the soft bevel
 * is smooth-shaded.
 */

const SRC = "/logo/kmk/logo-mark-hd.png";
const SIN60 = Math.sin(Math.PI / 3);

/** Rounded pointy-top hexagon `w` wide and `h` tall (h < 2w/√3; the difference is the rounding). */
function roundedHexagon(w: number, h: number) {
  const R = w / (2 * SIN60); // circumradius: the vertical sides span the full width
  // a corner of radius r pulls the top/bottom tips in by r / sin60 - r
  const r = (R - h / 2) / (1 / SIN60 - 1);
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 2 + (i * Math.PI) / 3; // vertex directions, counter-clockwise from the top
    const d = R - r / SIN60; // arc centre sits on the same ray, inside the vertex
    const cx = Math.cos(a) * d;
    const cy = Math.sin(a) * d;
    shape.absarc(cx, cy, r, a - Math.PI / 6, a + Math.PI / 6, false);
  }
  shape.closePath();
  return shape;
}

/**
 * The mark, `height` units tall and centred: geometry with two material groups (0 = front/back
 * faces carrying the logo image, 1 = bevel and sides) and the logo texture for the faces.
 */
export async function buildMark(
  height: number,
  depth: number,
  bevel: number,
  maxAnisotropy = 8,
) {
  const img = new Image();
  img.src = SRC;
  await img.decode();
  const width = (img.naturalWidth / img.naturalHeight) * height;

  const uv = (x: number, y: number) =>
    new THREE.Vector2(x / width + 0.5, y / height + 0.5);
  const raw = new THREE.ExtrudeGeometry(roundedHexagon(width, height), {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel * 1.3,
    bevelSize: bevel,
    bevelSegments: 12,
    curveSegments: 24,
    UVGenerator: {
      generateTopUV: (_g, v, a, b, c) => [
        uv(v[a * 3], v[a * 3 + 1]),
        uv(v[b * 3], v[b * 3 + 1]),
        uv(v[c * 3], v[c * 3 + 1]),
      ],
      generateSideWallUV: () => [
        new THREE.Vector2(),
        new THREE.Vector2(),
        new THREE.Vector2(),
        new THREE.Vector2(),
      ],
    },
  });
  // weld the bevel and sides so they shade smoothly; the faces stay separate (their UVs differ)
  raw.deleteAttribute("normal");
  const geo = mergeVertices(raw, 1e-4);
  raw.dispose();
  geo.computeVertexNormals();
  geo.translate(0, 0, -depth / 2);

  // bleed the badge colour past its edge (the PNG is transparent white outside the hexagon),
  // so filtering and mipmaps never show a light fringe around the face
  const cv = document.createElement("canvas");
  cv.width = img.naturalWidth;
  cv.height = img.naturalHeight;
  const ctx = cv.getContext("2d")!;
  for (const k of [1.08, 1.05, 1.03, 1.015]) {
    const w = cv.width * k;
    const h = cv.height * k;
    ctx.drawImage(img, (cv.width - w) / 2, (cv.height - h) / 2, w, h);
  }
  ctx.drawImage(img, 0, 0);
  const texture = new THREE.CanvasTexture(cv);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;

  return { geo, texture, front: depth / 2 + bevel * 1.3, width };
}
