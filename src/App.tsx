// App.jsx
import Contact from "./components/Contact";
import CorporateClients from "./components/CorporateClients";
import Platform from "./components/Platform";
import Products from "./components/Products";
import Services from "./components/Services";
import "./index.css";
import "./App.css";
import { motion } from "framer-motion";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Introduction from "./components/introduction";

const scrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Introduction />
      <Platform />
      <Services />
      <Products />
      <CorporateClients />
      <motion.div
        variants={scrollVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Contact />
      </motion.div>
    </>
  );
}

export default App;
