import { motion } from "framer-motion";
import "../styles/shiny.css";
import "../App.css";
import "./style.css";

const platformItems = [
  {
    title: "APPLICATION PLATFORM",
    item: [
      { icon: "/svg/platform/SAP.svg", alt: "SAP Power builder" },
      { icon: "/svg/platform/oracle-logo.svg", alt: "Oracle Database" },
    ],
  },
  {
    title: "MOBILE PLATFORM",
    item: [
      { icon: "/svg/platform/angular-icon.svg", alt: "Angular" },
      { icon: "/svg/platform/react-native-1.svg", alt: "React Native" },
      { icon: "/svg/platform/nodejs.svg", alt: "Node Js" },
    ],
  },
  {
    title: "WEB PLATFORM",
    item: [
      { icon: "/svg/platform/react.svg", alt: "React Js" },
      { icon: "/svg/platform/nodejs.svg", alt: "Node Js" },
      { icon: "/svg/platform/dot-net-core-7.svg", alt: "Dotnet Core" },
      {
        icon: "/svg/platform/microsoft-sql-server-1.svg",
        alt: "Microsoft SQL Server",
      },
    ],
  },
  {
    title: "MICROSOFT POWER",
    item: [
      { icon: "/svg/platform/PowerApps_scalable.svg", alt: "Power Apps" },
      { icon: "/svg/platform/PowerBI_scalable.svg", alt: "Power BI" },
      {
        icon: "/svg/platform/PowerAutomate_scalable.svg",
        alt: "Power Automate",
      },
      {
        icon: "/svg/platform/power-virtual-agents-colored.svg",
        alt: "Power Virtual Agent",
      },
      {
        icon: "/svg/platform/microsoft-office-sharepoint-2018-present--1.svg",
        alt: "Microsoft Sharepoint",
      },
    ],
  },
];

function Platform() {
  return (
    <section
      id="platform"
      className="platform-container bg-cover bg-center bg-no-repeat bg-gradient-to-b to-blue-500 from-teal-500"
    >
      <div className="platform-content container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: "-70px" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-full flex flex-col items-start text-white justify-center p-4 mb-4 md:mb-0"
        >
          <p className=" text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            PLATFORM
          </p>
          <p className="text-sm md:text-lg lg:text-xl mb-6 leading-relaxed">
            Our platform is designed to empower businesses with innovative
            solutions that enhance productivity and streamline operations. We
            strive to meet the diverse needs of our clients, fostering long-term
            partnerships built on trust and mutual success.
          </p>
        </motion.div>

        <div className="flex-1 w-full flex flex-col items-center justify-center">
          {platformItems.map((platform, index) => (
            <motion.div
              key={platform.title}
              initial={{ opacity: 0, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <div className="w-full text-center mb-6">
                <p className="platform-item-title text-white">
                  {platform.title}
                </p>
                <div className="platform-icon-container">
                  {platform.item.map((iconData, i) => (
                    <motion.div
                      key={i}
                      className="platform-icon shinyContainer"
                      animate={{ y: [0, -6, 0] }}
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
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Platform;
