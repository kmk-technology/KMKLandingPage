import IconSap from "../assets/svg/platform/SAP.svg";
import IconOracle from "../assets/svg/platform/oracle-logo.svg";
import IconReact from "../assets/svg/platform/react.svg";
import IconNodeJs from "../assets/svg/platform/nodejs.svg";
import IconSql from "../assets/svg/platform/microsoft-sql-server-1.svg";
import IconDotNet from "../assets/svg/platform/dot-net-core-7.svg";
import IconAngular from "../assets/svg/platform/angular-icon.svg";
import IconReactNative from "../assets/svg/platform/react-native-1.svg";
import IconSharePoint from "../assets/svg/platform/microsoft-office-sharepoint-2018-present--1.svg";
import IconPowerBI from "../assets/svg/platform/PowerBI_scalable.svg";
import IconPowerApps from "../assets/svg/platform/PowerApps_scalable.svg";
import IconPowerAutomate from "../assets/svg/platform/PowerAutomate_scalable.svg";
import IconPowerVirtualAgent from "../assets/svg/platform/power-virtual-agents-colored.svg";
import { motion } from "framer-motion";

import "../styles/shiny.css";
import "../App.css";
import "./style.css";
import { useEffect, useState } from "react";

const platformItems = [
  {
    title: "APPLICATION PLATFORM",
    item: [
      { icon: IconSap, alt: "SAP Power builder" },
      { icon: IconOracle, alt: "Oracle Database" },
    ],
  },
  {
    title: "MOBILE PLATFORM",
    item: [
      { icon: IconAngular, alt: "Angular" },
      { icon: IconReactNative, alt: "React Native" },
      { icon: IconNodeJs, alt: "Node Js" },
    ],
  },
  {
    title: "WEB PLATFORM",
    item: [
      { icon: IconReact, alt: "React Js" },
      { icon: IconNodeJs, alt: "Node Js" },
      { icon: IconDotNet, alt: "Dotnet Core" },
      { icon: IconSql, alt: "Microsoft SQL Server" },
    ],
  },

  {
    title: "MICROSOFT POWER",
    item: [
      { icon: IconPowerApps, alt: "Power Apps" },
      { icon: IconPowerBI, alt: "Power BI" },
      { icon: IconPowerAutomate, alt: "Power Automate" },
      { icon: IconPowerVirtualAgent, alt: "Power Virtual Agent" },
      { icon: IconSharePoint, alt: "Microsoft Sharepoint" },
    ],
  },
];
function Platform() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="platform-container">
      <motion.div
        initial={{ opacity: 1, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 / 2 }}
        className="rounded-shape"
      ></motion.div>
      <div className="platform-content">
        <motion.div
          initial={{ opacity: 0, x: "-70px" }}
          whileInView={isVisible ? { opacity: 1, x: 0 } : {}}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-full flex flex-col items-center justify-center p-4 mb-4 md:mb-0"
        >
          <p className="platform-title ">PLATFORM</p>
          <p className="platform-description">
            "Our platform is designed to empower businesses with innovative
            solutions that enhance productivity and streamline operations. We
            strive to meet the diverse needs of our clients, fostering long-term
            partnerships built on trust and mutual success."
          </p>
        </motion.div>

        <div className="flex-1 w-full flex flex-col items-center justify-center ">
          {platformItems.map((platform, index) => (
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={isVisible ? { opacity: 2, x: 0.5 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <div key={platform.title} className="w-full text-center mb-6">
                <p className="platform-item-title">{platform.title}</p>
                <div className="platform-icon-container ">
                  {platform.item.map((iconData, i) => (
                    <motion.div
                      key={i}
                      className="platform-icon shinyContainer "
                      animate={{
                        y: [0, -6, 0],
                      }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 2,
                        delay: i * 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <img
                        alt={iconData.alt}
                        src={iconData.icon}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Platform;
