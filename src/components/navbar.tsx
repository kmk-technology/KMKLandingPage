import React, { useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  let LinksLeft = [
    { name: "ABOUT", link: "/" },
    { name: "FLATFORM", link: "/" },
    { name: "PRODUCT", link: "/" },
  ];
  let LinksRight = [
    { name: "CUSTOMERS", link: "/" },
    { name: "CONTACT", link: "/" },
  ];

  let [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/3 md:left-1/2 transform -translate-x-1/2 z-50 w-full">
      <div className="backdrop-blur-lg bg-white/25 shadow-lg w-[40%] md:w-[60%] mx-auto rounded-full border border-white/20">
        <div className="flex items-center justify-between py-4 px-6">
          {/* Left-aligned section for desktop */}
          <div className="flex-1 md:flex hidden">
            <ul className="flex items-center">
              {LinksLeft.map((link) => (
                <li key={link.name} className="md:ml-8 font-semibold">
                  <a
                    href={link.link}
                    className="text-white hover:text-blue-400 duration-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo section */}
          <div className="flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 duration-300 hover:scale-110">
            <a href="/">
              <img
                className="w-16 h-auto"
                src="/logo/kmk/logo-nbg.png"
                alt="Logo"
              />
            </a>
          </div>

          {/* Right-aligned section for desktop */}
          <div className="flex-1 md:flex hidden justify-end">
            <ul className="flex items-center">
              {LinksRight.map((link) => (
                <li
                  key={link.name}
                  className={`md:ml-8 font-semibold ${
                    link.name === "CONTACT"
                      ? "text-green-500 hover:text-green-400"
                      : "text-white hover:text-blue-400"
                  } duration-500`}
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

        {/* Mobile version of the menu */}
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
                  className="block text-white px-2 py-2 rounded-md text-base font-semibold"
                >
                  {link.name}
                </a>
              </li>
            ))}
            {LinksRight.map((link) => (
              <li key={link.name} className="py-2 w-full text-center">
                <a
                  href={link.link}
                  className="block text-white px-2 py-2 rounded-md text-base font-semibold"
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
