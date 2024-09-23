import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import IconAC from "../assets/svg/corporate/an-cuong.svg";
import IconPepsi from "../assets/svg/corporate/pepsico-logo.svg";
import IconVt from "../assets/svg/corporate/viettien.svg";
import IconJia from "../assets/logo/jiahsin-logo.png";
import IconOfi from "../assets/logo/ofi-logo.png";
import IconShim from "../assets/logo/shimmer-logo.png";
import IconHl from "../assets/logo/qhl-logo.png";
import IconTcsc from "../assets/logo/tcsc-logo.png";
import IconLucky from "../assets/logo/lucky-logo.png";
import "../App.css";
import "./style.css";

const CorporateItems = [
  { name: "Pepsico", logo: IconPepsi },
  { name: "An Cường", logo: IconAC },
  { name: "OFI", logo: IconOfi },
  { name: "SHIMMER", logo: IconShim },
  { name: "Quảng Hưng Long", logo: IconHl },
  { name: "TCSC", logo: IconTcsc },
  { name: "VIETTIEN", logo: IconVt },
  { name: "JIA HSIN", logo: IconJia },
  { name: "LUCKY GROUP", logo: IconLucky },
];

const MedicalItems = Array.from({ length: 10 }, (_, i) => ({
  name: `Medi${i + 1}`,
  logo: IconPepsi,
}));
const ClientsSection: React.FC<{
  items: { name: string; logo: string }[];
}> = ({ items }) => {
  const scrollingContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDown(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.pageX;
    setStartX(clientX - (scrollingContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollingContainerRef.current?.scrollLeft || 0);
    e.preventDefault();
  }, []);

  const handleEnd = useCallback(() => {
    setIsDown(false);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();

      const clientX = "touches" in e ? e.touches[0].clientX : e.pageX;
      const walk = (clientX - startX) * 2;

      requestAnimationFrame(() => {
        if (scrollingContainerRef.current) {
          scrollingContainerRef.current.scrollLeft = scrollLeft - walk;
        }
      });
    },
    [isDown, startX, scrollLeft]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (scrollingContainerRef.current) {
      observer.observe(scrollingContainerRef.current);
    }

    return () => {
      if (scrollingContainerRef.current) {
        observer.unobserve(scrollingContainerRef.current);
      }
    };
  }, []);

  return (
    <section className="platform-container py-8 box-container flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <div
          ref={scrollingContainerRef}
          className="scrolling-container container overflow-hidden whitespace-nowrap cursor-grab"
          onMouseDown={handleStart}
          onMouseLeave={handleEnd}
          onMouseUp={handleEnd}
          onMouseMove={handleMove}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleMove}
          style={{ touchAction: "none" }}
        >
          <div className="flex space-x-8">
            {items.map((client) => (
              <motion.div
                key={client.name}
                className="scrolling-item flex items-center justify-center"
                style={{ userSelect: "none" }}
                initial={{ opacity: 0, y: 100 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center rounded-lg shadow-lg h-32 w-32 bg-white">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain"
                    draggable={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CorporateClients: React.FC = () => {
  return (
    <div className="relative box-container bg-gray-100 flex flex-col">
      <h2 className="platform-title font-bold m-2">CORPORATE CLIENTS</h2>{" "}
      <ClientsSection items={CorporateItems} />
      <h2 className="platform-title font-bold m-2">MEDICAL CLIENTS</h2>
      <ClientsSection items={MedicalItems} />
    </div>
  );
};

export default CorporateClients;
