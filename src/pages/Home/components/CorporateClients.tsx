import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

import "../../../App.css";
import "./style.css";

const CorporateItems = [
  { name: "Pepsico", logo: "/svg/corporate/pepsico-logo.svg" },
  { name: "An Cường", logo: "/svg/corporate/an-cuong.svg" },
  { name: "OFI", logo: "/logo/ofi-logo.png" },
  { name: "SHIMMER", logo: "/logo/shimmer-logo.png" },
  { name: "Quảng Hưng Long", logo: "/logo/qhl-logo.png" },
  { name: "TCSC", logo: "/logo/tcsc-logo.png" },
  { name: "VIETTIEN", logo: "/svg/corporate/viettien.svg" },
  { name: "JIA HSIN", logo: "/logo/jiahsin-logo.png" },
  { name: "LUCKY GROUP", logo: "/logo/lucky-logo.png" },
];

const MedicalItems = [
  { name: "PKDK Tâm An", logo: "logo/medical/taman.png" },
  { name: "QUEEN HOSPITAL", logo: "logo/medical/queenhopital.png" },
  { name: "MECCARE", logo: "logo/medical/meccare.png" },
  { name: "HOANGKHANG MEDICAL CENTER", logo: "logo/medical/hoangkhang.png" },
  { name: "PKDK PHƯỚC LINH", logo: "logo/medical/phuoclinh.jpg" },
  { name: "PKDK SÀI GÒN 115", logo: "logo/medical/pkdk115.jpg" },
  { name: "CTY CP BV Y DƯỢC 115", logo: "logo/medical/yduoc115.png" },
  { name: "PK SẢN PHỤ AN PHÚC", logo: "logo/medical/aa.png" },
  { name: "PKDK THÀNH CÔNG", logo: "logo/medical/thanhcong.jpg" },
  { name: "PHU LAM MEDICAL CENTER", logo: "logo/medical/phulam.png" },
  { name: "THIÊN HẬU POLYCLINIC", logo: "logo/medical/thienhau.jpg" },
  { name: "HƯNG DŨNG", logo: "logo/medical/hungdung.jpg" },
  { name: "PK NHI SÀI GÒN - PHÚC AN", logo: "logo/medical/pa+.png" },
  { name: "JT ANGEL", logo: "logo/medical/JTAngel.png" },
  { name: "Y HỌC GIA ĐÌNH PHƯỚC HÒA", logo: "logo/medical/yhgdPH.png" },
  { name: "NGỌC CHÂU", logo: "logo/medical/ngocchau.png" },
  { name: "PKDK LOUKAS HEALTH CARE", logo: "logo/medical/loukas.png" },
  { name: "SỞ Y TẾ BỆNH VIỆN HẠNH PHÚC", logo: "logo/medical/hanhphuc.png" },
  { name: "THIÊN PHÚC", logo: "logo/medical/thienphuc.png" },
  { name: "VIETTIEN", logo: "/svg/corporate/viettien.svg" },
  { name: "PK TĨNH MẠCH SÀI GÒN", logo: "logo/medical/svg.png" },
  { name: "PAIN CLINIC", logo: "logo/medical/painclinic.jpg" },
  { name: "SƠN CA", logo: "logo/medical/sonca.png" },
  { name: "PKYD SÀI GÒN HƯNG LONG", logo: "logo/medical/hunglong.jpg" },
  { name: "PKDK CHỢ CẦU", logo: "logo/medical/cclinic.png" },
  {
    name: "CTY CP BV SÀI GÒN CỬU LONG",
    logo: "logo/medical/saigoncuulong.png",
  },
  { name: "TIMEC", logo: "logo/medical/timec.png" },
];

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
      const container = scrollingContainerRef.current;
      const firstItem = container.children[0] as HTMLElement;
      const containerWidth = container.offsetWidth;
      const firstItemWidth = firstItem.offsetWidth;
      const scrollTo =
        firstItem.offsetLeft - containerWidth / 2 + firstItemWidth / 2;
      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }

    return () => {
      if (scrollingContainerRef.current) {
        observer.unobserve(scrollingContainerRef.current);
      }
    };
  }, []);

  const handleItemClick = (index: number) => {
    if (scrollingContainerRef.current) {
      const item = scrollingContainerRef.current.children[index] as HTMLElement;
      const containerWidth = scrollingContainerRef.current.offsetWidth;
      const itemWidth = item.offsetWidth;
      const scrollTo = item.offsetLeft - containerWidth / 2 + itemWidth / 2;
      scrollingContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=" py-5 w-full box-container flex flex-col justify-center items-center">
      <div
        ref={scrollingContainerRef}
        className="scrolling-container container"
        onMouseDown={handleStart}
        onMouseLeave={handleEnd}
        onMouseUp={handleEnd}
        onMouseMove={handleMove}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onTouchMove={handleMove}
        style={{ touchAction: "none" }}
      >
        <div className="flex items-center justify-start">
          {items.map((client, index) => (
            <motion.div
              key={index}
              className="scrolling-item flex items-center justify-center mx-2"
              data-tip={client.name}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleItemClick(index)}
            >
              <div className="p-2 flex items-center justify-center rounded-xl shadow-lg hover:scale-105 transition-transform hover:shadow-xl h-32 w-32 bg-white">
                <img
                  src={client.logo}
                  alt={client.name}
                  title={client.name}
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CorporateClients: React.FC = () => {
  return (
    <section id="clients">
      <div className="pre-container bg-gray-100 flex flex-col justify-center items-center w-full">
        <h2 className="platform-title font-bold m-2">CORPORATE CLIENTS</h2>
        <ClientsSection items={CorporateItems} />
        <h2 className="platform-title font-bold m-2">MEDICAL CLIENTS</h2>
        <ClientsSection items={MedicalItems} />
      </div>
    </section>
  );
};

export default CorporateClients;
