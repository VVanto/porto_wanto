"use client";
import Navbar from "../components/navbar";
import { Manrope } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/components/footer";
import { Space_Mono } from "next/font/google";

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
    <div className="bg-tiffany ">
      <Navbar variant="light" />
      <div className={`${manrope.className}`}>
        <div>
          <h1 className="text-judulhp lg:text-judul px-5 py-14 lg:p-24">
            My <br />
            Works
          </h1>
        </div>

        <div className={`py-10 md:py-32 px-5 lg:px-28 ${space.className}`}>
          <h1 className="text-judulhp lg:text-judul"> Nothing here Yet :/</h1>
          <p className="text-parhp lg:text-par py-28">
            I'll put something here when something big happening
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Work;
