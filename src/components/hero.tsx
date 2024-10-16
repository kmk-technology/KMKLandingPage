import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <section id="kmk">
      <div
        ref={ref}
        className="w-full h-screen overflow-hidden relative grid place-items-center z-10"
      >
        <motion.h1
          style={{ y: textY }}
          className="font-bold text-white text-7xl md:text-9xl relative z-10 mb-72"
        >
          KMK TECHNOLOGY <span className="text-4xl ml-2 absolute">®</span>
        </motion.h1>
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("home/full-verrylarge.jpg")`,
            backgroundPosition: "bottom",
            backgroundSize: "79% ",
          }}
        ></motion.div>

        <div
          className="absolute inset-0 z-20"
          style={{
            backgroundImage: `url("home/building.png")`,
            backgroundPosition: "bottom",
            backgroundSize: "79%",
          }}
        ></div>
      </div>
    </section>
  );
};

export default Hero;
