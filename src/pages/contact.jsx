"use client";
import Navbar from "../components/navbar";
import { Cormorant_Garamond } from "next/font/google";
import { Montserrat } from "next/font/google";
import Footer from "@/components/footer";
import "@/app/globals.css";

const cormo = Cormorant_Garamond({
  weight: ["600"],
  subsets: ["latin"],
});

const mont = Montserrat({
  weight: ["500"],
  subsets: ["latin"],
});

function Contact() {
  return (
    <div className={`bg-pink ${cormo.className}`}>
      <Navbar />
      <div className=" grid grid-rows-3 lg:grid-cols-2 lg:grid-rows-2 h-screen">
        <div className="py-20 px-5 lg:p-20 text-akhirhp lg:text-akhir row-span-1 col-span-1">
          <h1>
            Contact <br /> Me
          </h1>
        </div>
        <div className="max-sm:hidden"></div>
        <div className={`py-16 px-5 lg:p-20 text-par ${mont.className}`}>
          <ul>
            <li className="hover:border-b-4 hover:border-black transition-all duration-200">
              <a href="https://www.instagram.com/_vvanto_/">Instagram</a>
            </li>
            <li className="hover:border-b-4 hover:border-black transition-all duration-200">
              <a href="https://www.linkedin.com/in/nicosuwanto/">LinkedIn</a>
            </li>
            <li className="hover:border-b-4 hover:border-black transition-all duration-200">
              <a href="https://wa.me/+6281323339006">Whatsapp</a>
            </li>
            <li className="hover:border-b-4 hover:border-black transition-all duration-200">
              <a href="https://x.com/_vvanto_">X</a>
            </li>
            <li className="hover:border-b-4 hover:border-black transition-all duration-200">
              <a href="https://www.facebook.com/nico.wanto.1/?locale=id_ID">Facebook</a>
            </li>
            <li className="hover:border-b-4 hover:border-black transition-all duration-200">
              <a href="https://line.me/ti/p/QGT4OLRrIi">Line</a>
            </li>
          </ul>
        </div>
        <div className="py-20 px-5 lg:p-20 text-akhirhp lg:text-akhir row-span-1 col-span-1 flex justify-end items-end text-right">
          <h1>
            Nico <br /> Suwanto
          </h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
