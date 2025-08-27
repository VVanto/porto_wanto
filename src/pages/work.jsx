"use client";
import Navbar from "../components/navbar";
import { Manrope } from "next/font/google";
import "@/app/globals.css";
import Image from "next/image";
import Footer from "@/components/footer";
import { Space_Mono } from "next/font/google";

import gawe from "@/assets/gawe.json";

const space = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
});
const manrope = Manrope({
  weight: ["700"],
  subsets: ["latin"],
});
function Work() {
  return (
    <div className="bg-teal text-beige">
      <Navbar />
      <div className={`${manrope.className}`}>
        <div>
          <h1 className="text-judulhp lg:text-judul px-5 py-14 lg:p-24">
            My <br />
            Works
          </h1>
        </div>

        <div className={`py-5 md:py-2 px-5 lg:px-28 ${space.className}`}>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {gawe.map((item, index) => (
              <li key={index}>
                <a href={item.href}>
                  <Image
                    className="py-5"
                    src={item.image}
                    width={800}
                    height={200}
                    alt={item.title}
                  />
                  <h1 className="text-subjudulhp lg:text-subjudul">
                    {item.title}
                  </h1>
                </a>
                <p className="text-parhp lg:text-par py-3">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Work;
