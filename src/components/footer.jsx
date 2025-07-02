"use client";
import { Manrope } from "next/font/google";
import Marquee from "react-fast-marquee";
import { Montserrat } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Space_Mono } from "next/font/google";

const manrope = Manrope({
  weight: ["600", "700"],
  subsets: ["latin"],
});

const mont = Montserrat({
  weight: ["500"],
  subsets: ["latin"],
});

const cormo = Cormorant_Garamond({
  weight: ["400"],
  subsets: ["latin"],
});

const space = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

const date = new Date();
let year = date.getFullYear();

function Footer() {
  return (
    <footer>
      <div
        className={`py-12 px-20 text-m flex items-center justify-between ${mont.className}`}
      >
        <h3>
          Feel free to reach out if you have a job offer <br /> or simply just
          want a chat.
        </h3>
        <h3>(●'◡'●)</h3>
      </div>
      <Marquee autoFill direction="right" speed={90} className="py-8 bg-purple text-volt">
        {[
          {
            text: "www.nicosuwanto@gmail.com ↬",
            font: manrope.className,
            fontWeight: 700,
          },
          {
            text: "www.nicosuwanto@gmail.com  →",
            font: mont.className,
            fontWeight: 500,
          },
          {
            text: "www.nicosuwanto@gmail.com  ⇨",
            font: cormo.className,
            fontWeight: 600,
          },
        ].map((item, index) => (
          <h3
            key={index}
            className={`text-judulhp lg:text-judul ${item.font}`}
            style={{ fontWeight: item.fontWeight }}
          >
            {item.text}
          </h3>
        ))}
      </Marquee>

      <h3 className={`px-20 py-10 flex justify-end text-s ${space.className}`}>
        ©{year} TILL A COUPLE YEARS, VIELLEICHT?
      </h3>
    </footer>
  );
}

export default Footer;
