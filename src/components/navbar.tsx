import { useState, useEffect } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  let LinksLeft = [
    { name: "INTRODUCE", link: "#kmk" },
    { name: "FLATFORM", link: "#platform" },
    { name: "SERVICES", link: "#services" },
  ];

  let LinksRight = [
    { name: "PRODUCT", link: "#products" },
    { name: "CLIENTS", link: "#clients" },
    { name: "CONTACT", link: "#contact" },
  ];

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  let [open, setOpen] = useState(false);

  return (
    <div className="fixed top-2 left-1/3 md:left-1/2 transform -translate-x-1/2 z-50 w-full">
      <div className=" bg-white shadow-lg w-[40%] md:w-[60%] mx-auto rounded-full border border-white/20">
        <div className="flex items-center justify-between py-4 px-6">
          <div className="flex-1 md:flex hidden">
            <ul className="flex items-center">
              {LinksLeft.map((link) => (
                <li
                  key={link.name}
                  className={`md:ml-8 font-semibold ${
                    activeSection === link.link.substring(1)
                      ? "font-bold text-[#2176F5]"
                      : "text-black"
                  } hover:text-[#2176F5]`}
                >
                  <a href={link.link}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 duration-300 hover:scale-110">
            <a href="/">
              <img
                className="w-16 h-auto"
                src="/logo/kmk/logo-nbg.png"
                alt="Logo"
              />
            </a>
          </div>

          <div className="flex-1 md:flex hidden justify-end">
            <ul className="flex items-center">
              {LinksRight.map((link) => (
                <li
                  key={link.name}
                  className={`md:mr-8 font-semibold ${
                    activeSection === link.link.substring(1)
                      ? "font-bold text-[#2176F5]"
                      : "text-black"
                  } hover:text-[#2176F5]`}
                >
                  <a href={link.link}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className=" flex cursor-pointer md:hidden w-7 h-7 text-white ml-28"
            onClick={() => setOpen(!open)}
          >
            {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
          </div>
        </div>

        <div
          className={`md:hidden ${
            open ? "block" : "hidden"
          } absolute w-full bg-black/60 backdrop-blur-lg rounded-b-lg shadow-lg transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col items-center ">
            {LinksLeft.map((link) => (
              <li key={link.name} className="py-2 w-full text-center">
                <a
                  href={link.link}
                  className={`block text-white px-2 py-2 rounded-md text-base font-semibold ${
                    activeSection === link.link.substring(1)
                      ? "font-bold text-blue-500"
                      : ""
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
            {LinksRight.map((link) => (
              <li key={link.name} className="py-2 w-full text-center">
                <a
                  href={link.link}
                  className={`block text-white px-2 py-2 rounded-md text-base font-semibold ${
                    activeSection === link.link.substring(1)
                      ? "font-bold text-blue-500"
                      : ""
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
