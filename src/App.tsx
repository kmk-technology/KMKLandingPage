// App.jsx
import Contact from "./components/contact";
import CorporateClients from "./components/corporateClients";
import Platform from "./components/platform";
import Products from "./components/products";
import Services from "./components/services";
import "./index.css";
import "./App.css";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Introduction from "./components/introduction";

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
      <Contact />
    </>
  );
}

export default App;
