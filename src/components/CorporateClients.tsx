import React, { useRef } from "react";
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

const MedicalItems = [
  { name: "Medi1", logo: IconLucky },
  { name: "Medi2", logo: IconLucky },
  { name: "Medi3", logo: IconLucky },
  { name: "Medi4", logo: IconLucky },
  { name: "Medi5", logo: IconLucky },
  { name: "Medi6", logo: IconLucky },
  { name: "Medi7", logo: IconLucky },
  { name: "Medi8", logo: IconLucky },
  { name: "Medi9", logo: IconLucky },
  { name: "Medi10", logo: IconLucky },
];

const ClientsSection: React.FC<{
  title: string;
  items: { name: string; logo: string }[];
}> = ({ title, items }) => {
  const scrollingContainerRef = useRef<HTMLDivElement | null>(null);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDown = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.pageX;
    startX = clientX - (scrollingContainerRef.current?.offsetLeft || 0);
    scrollLeft = scrollingContainerRef.current?.scrollLeft || 0;
    e.preventDefault();
  };

  const handleEnd = () => {
    isDown = false;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.pageX;
    const walk = (clientX - startX) * 2;
    scrollingContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-gray-100 py-8 w-screen">
      <div className="flex flex-col items-center">
        <h2 className="platform-title font-bold m-2">{title}</h2>
        <div
          ref={scrollingContainerRef}
          className="scrolling-container container bg-gray-100 overflow-hidden whitespace-nowrap cursor-grab"
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
              <div
                key={client.name}
                className="scrolling-item flex items-center justify-center "
                style={{ userSelect: "none" }}
              >
                <div className="flex items-center justify-center rounded-lg shadow-lg h-32 w-32 p-1 bg-white">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CorporateClients: React.FC = () => {
  return (
    <div className="h-screen container ">
      <ClientsSection title="CORPORATE CLIENTS" items={CorporateItems} />
      <ClientsSection title="MEDICAL CLIENTS" items={MedicalItems} />
    </div>
  );
};

export default CorporateClients;
