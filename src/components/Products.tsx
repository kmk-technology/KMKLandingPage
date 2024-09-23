import IcoMedifam from "../assets/logo/MEDIFAM-logo.jpg";
import IcoKmkSale from "../assets/logo/KMK-SALE-logo.png";
import IcoKmkWms from "../assets/logo/KMK-WMS-logo.png";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "../App.css";
import "./style.css";
import { motion } from "framer-motion";

const data = [
  {
    name: "MEDIFAM",
    image: IcoMedifam,
    sub: "Medical Family System",
    link: "https://medifam.vn/",
  },
  {
    name: "KMK SALES",
    image: IcoKmkSale,
    sub: "Point Of Sale",
    link: "",
  },
  {
    name: "KMK WMS",
    image: IcoKmkWms,
    sub: "WareHouse Management Solutions",
    link: "",
  },
];

export default function Products() {
  return (
    <div className="relative box-container bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full p-2 pb-20 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white font-bold text-lg md:text-3xl lg:text-5xl text-center m-2">
            PRODUCTS
          </p>
          <p className="platform-description text-center text-white text-lg">
            "Our products are highly valued for their efficiency, particularly
            our supportive services. As a result, we have earned the steadfast
            trust of our partners and clients."
          </p>
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center ">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: -90 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className="card relative transform  z-10 p-5 shinyContainer "
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full p-12 h-auto object-contain max-w-xs md:max-w-xs lg:max-w-sm "
            />

            <h1 className="font-bold text-xl text-blue-500 text-center">
              {item.name}
            </h1>
            <p className="text-center text-sm font-bold text-gray-500">{item.sub}</p>
            {/* Button */}
            <a href={item.link}>
              <div className="button group">
                <div className="button-inner rounded-lg pl-5 pr-5">
                  <div className="flex items-center transition-transform duration-150 scale transform group-hover:scale-125">
                    <p className="text-sm text-white font-bold transition-transform duration-150 group-hover:text-blue-500">
                      Visit
                    </p>
                    <KeyboardDoubleArrowRightIcon className="text-white transition-transform duration-150 group-hover:text-blue-500" />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
