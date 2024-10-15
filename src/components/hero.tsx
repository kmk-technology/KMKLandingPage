import React, { useRef } from "react";
import fullHero from "../.././public/home/full-verrylarge.jpg";
import building from "../.././public/home/building.png";
import { useScroll, useTransform, motion } from "framer-motion";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backGroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
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
          backgroundImage: `url(${fullHero})`,
          backgroundPosition: "bottom",
          backgroundSize: "79% ",
          y: backGroundY,
        }}
      ></motion.div>

      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(${building})`,
          backgroundPosition: "bottom",
          backgroundSize: "79%",
        }}
      ></div>
    </div>
  );
};

export default Hero;
