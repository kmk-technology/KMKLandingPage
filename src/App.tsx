// App.jsx
import Contact from "./components/contact.tsx";
import CorporateClients from "./components/corporateClients.tsx";
import Platform from "./components/platform.tsx";
import Products from "./components/products.tsx";
import Services from "./components/services.tsx";
import "./index.css";
import "./App.css";
import Navbar from "./components/navbar.tsx";
import Hero from "./components/hero.tsx";
import Introduction from "./components/introduction.tsx";

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
