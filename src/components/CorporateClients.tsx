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
//medical
import iconTamAn from "../assets/logo/medical/taman.png";
import iconQueenHopital from "../assets/logo/medical/queenhopital.png";
import iconMeccare from "../assets/logo/medical/meccare.png";
import iconHoangKhang from "../assets/logo/medical/hoangkhang.png";
import iconPkPhuocLinh from "../assets/logo/medical/phuoclinh.jpg";
import iconPkdk115 from "../assets/logo/medical/pkdk115.jpg";
import iconYd115 from "../assets/logo/medical/yduoc115.png";
import iconAa from "../assets/logo/medical/aa.png";
import iconPkThanhCong from "../assets/logo/medical/thanhcong.jpg";
import iconTtPhulam from "../assets/logo/medical/phulam.png";
import iconThienHau from "../assets/logo/medical/thienhau.jpg";
import iconHungDung from "../assets/logo/medical/hungdung.jpg";
import iconPAplus from "../assets/logo/medical/pa+.png";
import iconJT from "../assets/logo/medical/JTAngel.png";
import iconYhgdPhuochoa from "../assets/logo/medical/yhgdPH.png";
import iconNgocChau from "../assets/logo/medical/ngocchau.png";
import iconLoukas from "../assets/logo/medical/loukas.png";
import iconHanhPhuc from "../assets/logo/medical/hanhphuc.png";
import iconThienphuc from "../assets/logo/medical/thienphuc.png";
import iconSvg from "../assets/logo/medical/svg.png";
import iconPainclinic from "../assets/logo/medical/painclinic.jpg";
import iconSonca from "../assets/logo/medical/sonca.png";
import iconPkydHunglong from "../assets/logo/medical/hunglong.jpg";
import iconCclinic from "../assets/logo/medical/cclinic.png";
import iconBvSgCuuLong from "../assets/logo/medical/saigoncuulong.png";
import iconTimec from "../assets/logo/medical/timec.png";

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

const MedicalItems = [
  { name: "PKDK Tâm An", logo: iconTamAn },
  { name: "QUEEN HOSPITAL", logo: iconQueenHopital },
  { name: "MECCARE", logo: iconMeccare },
  { name: "HOANGKHANG MEDICAL CENTER", logo: iconHoangKhang },
  { name: "PKDK PHƯỚC LINH", logo: iconPkPhuocLinh },
  { name: "PKDK SÀI GÒN 115", logo: iconPkdk115 },
  { name: "CTY CP BV Y DƯỢC 115", logo: iconYd115 },
  { name: "PK SẢN PHỤ AN PHÚC", logo: iconAa },
  { name: "PKDK THÀNH CÔNG", logo: iconPkThanhCong },
  { name: "PHU LAM MEDICAL CENTER", logo: iconTtPhulam },
  { name: "THIÊN HẬU POLYCLINIC", logo: iconThienHau },
  { name: "HƯNG DŨNG", logo: iconHungDung },
  { name: "PK NHI SÀI GÒN - PHÚC AN", logo: iconPAplus },
  { name: "JT ANGEL", logo: iconJT },
  { name: "Y HỌC GIA ĐÌNH PHƯỚC HÒA", logo: iconYhgdPhuochoa },
  { name: "NGỌC CHÂU", logo: iconNgocChau },
  { name: "PKDK LOUKAS HEALTH CARE", logo: iconLoukas },
  { name: "SỞ Y TẾ BỆNH VIỆN HẠNH PHÚC", logo: iconHanhPhuc },
  { name: "THIÊN PHÚC", logo: iconThienphuc },
  { name: "VIETTIEN", logo: IconVt },
  { name: "PK TĨNH MẠCH SÀI GÒN", logo: iconSvg },
  { name: "PAIN CLINIC", logo: iconPainclinic },
  { name: "SƠN CA", logo: iconSonca },
  { name: "PKYD SÀI GÒN HƯNG LONG", logo: iconPkydHunglong },
  { name: "PKDK CHỢ CẦU", logo: iconCclinic },
  { name: "CTY CP BV SÀI GÒN CỬU LONG", logo: iconBvSgCuuLong },
  { name: "TIMEC", logo: iconTimec },
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
    }

    return () => {
      if (scrollingContainerRef.current) {
        observer.unobserve(scrollingContainerRef.current);
      }
    };
  }, []);

  return (
    <section className="platform-container py-5 box-container flex flex-col justify-center items-center">
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
        <div className="flex flex-row items-center justify-center">
          {items.map((client, index) => (
            <motion.div
              key={index}
              className="scrolling-item flex items-center justify-center mx-2"
              data-tip={client.name}
              initial={{ opacity: 0, y: 100 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center rounded-lg shadow-lg h-32 w-32 bg-white">
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
