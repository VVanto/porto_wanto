"use client";
import Navbar from "../components/navbar";
import { Montserrat } from "next/font/google";
import Footer from "@/components/footer";
import "@/app/globals.css";
import { EB_Garamond } from "next/font/google";

// Fonts
const garam = EB_Garamond({
  weight: ["400"],
  subsets: ["latin"],
});

const mont = Montserrat({
  weight: ["500"],
  subsets: ["latin"],
});

function Contact() {
  // WavyText: Handle each letter's rotation effect
  const WavyText = ({ text }) => {
    return (
      <span className="group">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-200 ease-in-out group-hover:rotate-[180deg]"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="bg-">
      <Navbar variant="light" />

      <div
        className={` grid grid-rows-3 lg:grid-cols-2 lg:grid-rows-2 h-screen ${garam.className}`}
      >
        <div className="py-20 px-5 lg:p-20 text-akhirhp lg:text-akhir row-span-1 col-span-1">
          <h1>
            Contact <br /> Me
          </h1>
          
        </div>
        
        <div className="max-sm:hidden"></div>
        <div className={`py-16 px-5 lg:p-20 text-par ${mont.className}`}>
        
          <ul>
            {[
              { label: "Instagram", href: "https://www.instagram.com/_vvanto_/" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/nicosuwanto/" },
              { label: "Whatsapp", href: "https://wa.me/+6281323339006" },
              { label: "X", href: "https://x.com/_vvanto_" },
              { label: "Facebook", href: "https://www.facebook.com/nico.wanto.1/?locale=id_ID" },
              { label: "Line", href: "https://line.me/ti/p/QGT4OLRrIi" },
            ].map((item) => (
              <li
                key={item.label}
                className="group hover:border-b-4 hover:border-black transition-all duration-200 w-fit"
              >
                <a href={item.href}>
                  <WavyText text={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="py-20 px-5 lg:p-20 text-akhirhp lg:text-akhir row-span-1 col-span-1 flex justify-end items-end text-right">
          <h1>
            Nico <br /> Wanto
          </h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
