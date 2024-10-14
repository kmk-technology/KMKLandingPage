import React from "react";
import moment from "moment";
import Logo from "../assets/logo/KmkTech.png";
import "typeface-roboto";
const Contact = () => (
  <React.Fragment>
    <section className="relative py-12 bg-transparent" id="contact">
      <div className="max-w-screen-2xl px-6 xl:px-16 py-10 mx-auto flex flex-col items-center space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-28 w-full">
          <div className="flex flex-row space-x-4 items-center justify-center">
            <img
              src={Logo}
              className="h-32 w-32 object-contain"
              alt="KMK Technology Logo"
            />
            <div className="text-gray-800 space-y-6">
              <div className="flex flex-row">
                <p className="font-bold text-2xl text-gray-800 font-roboto uppercase">
                  Simplify Your Business
                  <br /> Innovate for Excellence
                </p>
              </div>
              <p>
                We simplify your business operations by streamlining processes
                and reducing complexity, allowing you to focus on core
                activities. KMK innovates continuously to deliver cutting-edge
                solutions and exceed industry standards.
              </p>
            </div>
          </div>
          <div className="text-gray-800 space-y-6">
            <p className="font-bold text-2xl">CONTACT US</p>
            <ul className="space-y-4 text-lg">
              <li className="flex flex-wrap items-center space-x-4">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="space-y-2">
                  <a
                    href="https://kmk-tech.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-700 transition mr-2"
                  >
                    kmk-tech.vn
                  </a>
                  <a
                    href="https://medifam.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-700 transition  mr-2"
                  >
                    medifam.vn
                  </a>
                  <a
                    href="https://yhgd.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-700 transition  mr-2"
                  >
                    yhgd.vn
                  </a>
                  <a
                    href="https://kmksales.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-700 transition  mr-2"
                  >
                    kmksales.vn
                  </a>
                </div>
              </li>

              <li className="flex items-center space-x-4">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p>
                  17 Street 24B, Binh Tri Dong B Ward, Binh Tan District, Ho Chi
                  Minh City
                </p>
              </li>

              <li className="flex items-center space-x-4">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 6v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2z" />
                  <path d="M2 6l10 7 10-7" />
                </svg>
                <a href="mailto:trung.ht@kmk-tech.vn" className="text-gray-700">
                  trung.ht@kmk-tech.vn
                </a>
              </li>

              <li className="flex items-center space-x-4">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <p>0938 220 711 - Trung Tan Huynh</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <footer className="p-4 border-t border-gray-300 text-center bg-white text-gray-700">
      <p>
        © {moment().format("YYYY")} - All rights reserved by{" "}
        <span className="font-semibold">KMK TECHNOLOGY COMPANY</span>
      </p>
    </footer>
  </React.Fragment>
);

export default Contact;
