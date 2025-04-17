// App.jsx
import Contact from "./components/Contact";
import CorporateClients from "./components/CorporateClients";
import Platform from "./components/Platform";
import Products from "./components/Products";
import Services from "./components/Services";
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
