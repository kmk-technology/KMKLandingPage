import TtyIcon from "@mui/icons-material/Tty";
import CodeIcon from "@mui/icons-material/Code";
import CloudIcon from "@mui/icons-material/Cloud";
import PublicIcon from "@mui/icons-material/Public";
import { SvgIconComponent } from "@mui/icons-material";
import "../../../App.css";
import "./style.css";
import { motion } from "framer-motion";

const data = [
  {
    name: "Software Development",
    icon: CodeIcon as SvgIconComponent,
    sub: "Building and developing software",
  },
  {
    name: "Consultant",
    icon: TtyIcon as SvgIconComponent,
    sub: "Consulting ERP solutions (Oracle EBS, SAP)",
  },
  {
    name: "Cloud Server",
    icon: CloudIcon as SvgIconComponent,
    sub: "Providing IT infrastructure equipment",
  },
  {
    name: "Outsourcing",
    icon: PublicIcon as SvgIconComponent,
    sub: "Provide IT service Outsourcing",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative box-container flex flex-col justify-center items-center bg-cover bg-blue-500"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="p-10 flex flex-col items-center justify-center text-white"
      >
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          SERVICES
        </p>
        <p className="text-sm md:text-lg lg:text-xl mb-6 leading-relaxed">
          Our products are highly valued for their efficiency, particularly our
          supportive services.
        </p>
      </motion.div>

      <div className="max-w-7xl flex flex-wrap justify-center items-center mx-auto p-4  m-10 mb-10 transition-transform  hover:scale-95">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            className="flex flex-col items-center sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 hover:scale-95 transition-transform"
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col items-center justify-center rounded-full bg-blue mb-5 shadowinner h-40 w-40">
              <item.icon className="text-white" style={{ fontSize: "40px" }} />
            </div>

            <h1 className="font-bold text-xl md:text-2xl text-white text-center">
              {item.name}
            </h1>
            <p className="platform-description text-gray-300 text-center">
              {item.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
