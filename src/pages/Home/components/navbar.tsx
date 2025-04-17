import { useState, useEffect } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const LinksLeft = [
    { name: "INTRODUCE", link: "/#kmk" },
    { name: "FLATFORM", link: "/#platform" },
    { name: "SERVICES", link: "/#services" },
  ];

  const LinksRight = [
    { name: "PRODUCT", link: "/#products" },
    { name: "CLIENTS", link: "/#clients" },
    { name: "CONTACT", link: "/#contact" },
  ];

  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);

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

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full">
      <div
        className={`${
          !open
            ? "backdrop-blur-lg bg-white/25 rounded-full border border-white/20"
            : " bg-transparent"
        }  shadow-lg w-[90%] md:w-[60%] mx-auto `}
      >
        <div className="flex justify-between items-center">
          <div className=" md:flex hidden">
            <ul className="flex items-center">
              {LinksLeft.map((link) => (
                <li
                  key={link.name}
                  className={` md:ml-8 font-semibold text-sm sm:text-sm lg:text-base ${
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

          <div className="flex justify-center items-center duration-300 hover:scale-110">
            <a href="/#">
              <img
                className="w-20 h-auto"
                src="/logo/kmk/logo-nbg.png"
                alt="Logo"
              />
            </a>
          </div>

          {/* Right Links */}
          <div className="flex justify-between items-center">
            <ul className=" md:flex hidden">
              {LinksRight.map((link) => (
                <li
                  key={link.name}
                  className={`md:mr-8 font-semibold text-sm sm:text-sm lg:text-base ${
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
            className="md:hidden flex items-center cursor-pointer p-6"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3BottomRightIcon className="w-7 h-7" />
            )}
          </div>
        </div>

        <div
          className={`md:hidden ${
            open ? "block" : "hidden"
          } w-full bg-[#2176F5]/60 rounded-2xl backdrop-blur-lg rounded-b-lg transition-all duration-500 ease-in-out`}
        >
          <ul className="flex flex-col items-center py-4">
            {LinksLeft.concat(LinksRight).map((link) => (
              <li key={link.name} className="py-2 w-full text-center">
                <a
                  href={link.link}
                  onClick={() => setOpen(false)}
                  className={`block text-white px-2 py-2 rounded-md text-sm sm:text-base lg:text-lg font-semibold ${
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
    </nav>
  );
};

export default Navbar;
