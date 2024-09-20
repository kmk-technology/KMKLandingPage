import IcoMedifam from "../assets/logo/MEDIFAM-logo.jpg";
import IcoKmkSale from "../assets/logo/KMK-SALE-logo.png";
import IcoKmkWms from "../assets/logo/KMK-WMS-logo.png";
import "../App.css";
import "./style.css";
import "../styles/shiny.css";

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
    <div className="box-container p-5 bg-blue-100 flex flex-col justify-center items-center ">
      <p className="platform-title font-bold m-2">PRODUCTS</p>
      <div className="flex flex-wrap ">
        {data.map((item) => (
          <div
            key={item.name}
            className=" flex flex-col items-center m-5 p-20 max-w-xs rounded-lg bg-white shadow-lg shinyContainer"
          >
            <a href={item.link}>
              <img
                src={item.image}
                alt={item.name}
                className="w-auto object-contain mb-10 transition-transform transform hover:scale-110  "
              />
            </a>

            <h1 className="text-lg font-bold text-2xl text-blue-500 text-center">
              {item.name}
            </h1>
            <p className=" text-center text-xl font-bold">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
