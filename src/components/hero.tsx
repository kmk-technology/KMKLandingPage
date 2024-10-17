import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section id="kmk" className="hidden md:block">
      <div
        ref={ref}
        className="w-full md:h-screen overflow-hidden relative grid place-items-center z-10"
      >
        <motion.h1
          style={{ y: textY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1 }}
          className="font-bold text-white text-3xl md:text-9xl relative z-10 mb-72"
        >
          KMK TECHNOLOGY <span className="text-4xl ml-2 absolute">®</span>
        </motion.h1>

        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("home/full-verrylarge.jpg")`,
            backgroundPosition: "bottom",
            backgroundSize: "79%",
          }}
        />

        <div
          className="absolute inset-0 z-20"
          style={{
            backgroundImage: `url("home/building.png")`,
            backgroundPosition: "bottom",
            backgroundSize: "79%",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
