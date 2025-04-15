"use client";

import { useState } from "react";
import { Manrope } from "next/font/google";
import Image from "next/image";
import profpic from "@/assets/profpic.png";
import Navbar from "@/components/navbar";
import Marquee from "react-fast-marquee";
import { Montserrat } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";

import Footer from "@/components/footer";

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



function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleLeave = () => {
    setActiveIndex(null);
  };

  const getColumnStyle = (index) => {
    const baseStyle = {
      transition: "all 0.3s ease",
      position: "relative",
    };

    if (activeIndex === null) return baseStyle;

    if (activeIndex === index) {
      return {
        ...baseStyle,
        transform: "scale(1.1)",
        zIndex: 10,
      };
    }

    if (index < activeIndex) {
      return {
        ...baseStyle,
        transform: "translateX(-20%)",
      };
    }

    if (index > activeIndex) {
      return {
        ...baseStyle,
        transform: "translateX(20%)",
      };
    }

    return baseStyle;
  };

  return (
    <div className="bg-black text-white">
      <Navbar />

      <header className="px-4 py-20 flex flex-col lg:flex-row gap-8 items-center justify-center">
        <Image src={profpic} width={400} alt="Picture of the author" />

        <div
          className={"font-futura text-left"}
          style={{ fontWeight: 500 }}
        >
          <h1 className="text-judulhp lg:text-judul">
            The Future is <br />
            Built With <br /> Clean Code And <br /> Creativity
          </h1>
        </div>
      </header>

      <div
        className={`${manrope.className} grid self-end text-jalanhp lg:text-jalan `}
      >
        <Marquee autoFill speed={70} className="bg-blue text-black">
          <h3> ⚫ FRONTEND DEVELOPER </h3>
          <h3> ⚫ MOBILE DEVELOPER </h3>
          <h3> ⚫ INTERACTIVE DESIGN </h3>
          <h3> ⚫ TEAMWORK </h3>
          <h3> ⚫ ENGLISH </h3>
        </Marquee>
        <Marquee autoFill direction="right" speed={70} className="bg-custard text-black">
          <h3> ⚫ HTML </h3>
          <h3> ⚫ CSS </h3>
          <h3> ⚫ JAVASCRIPT </h3>
          <h3> ⚫ REACT JS </h3>
          <h3> ⚫ NEXT JS </h3>
          <h3> ⚫ TAILWIND CSS </h3>
          <h3> ⚫ VITE </h3>
          <h3> ⚫ GIT </h3>
          <h3> ⚫ GITHUB </h3>
          <h3> ⚫ GITLAB </h3>
        </Marquee>
      </div>

      <div className="font-futura">
        <div>
          <p className="text-isihp font-thin lg:text-isi lg:pr-550 py-20 pb-4 mx-5 lg:mx-20">
            I'm a junior Front-end Developer passionate about learning and
            growing in this field. I believe success comes from hard work and
            good things happen to those who put in the effort. My motto is if
            you want to win the lottery, you need to earn the money to buy a
            ticket.
          </p>
        </div>

        <div
          className={`mx-5 lg:mx-20 py-5 border-t border-white flex flex-col lg:flex-row lg:items-center justify-between font-futura`}
        >
          <p>SOME PLACE I'VE WORKED FOR</p>
          <h3 className=" text-jalanhp lg:text-jalan">
            PT Pharos Indonesia / Freelance
          </h3>
        </div>

        <div
          className={`mx-5 lg:mx-20 py-8 border-t border-white font-futura`}
        >
          <p className="mb-5">WHAT I DO</p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 relative">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`p-4 ${
                  index < 4 ? "max-md:border-b lg:border-r border-white" : ""
                }`}
                style={getColumnStyle(index)}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleLeave}
              >
                <h2 className="text-subjudulhp lg:text-subjudul mb-2">
                  {
                    [
                      "Web Development",
                      "Mobile Apps",
                      "UI/UX Design",
                      "Collaboration",
                    ][index]
                  }
                </h2>
                <p className="text-parhp lg:text-par">
                  {
                    [
                      "Building responsive websites with modern technologies like React and Next.js",
                      "Developing cross-platform mobile apps with React Native",
                      "Creating intuitive interfaces with Figma and prototyping",
                      "Working in teams using Git and agile methodologies",
                    ][index]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Marquee autoFill direction="left" speed={90} className="py-8 bg-white text-navy">
        {[
          { text: "VIEW MY WORKS ↬", font: manrope.className, fontWeight: 700 },
          { text: "VIEW MY WORKS →", font: mont.className, fontWeight: 500 },
          { text: "VIEW MY WORKS ⇨", font: cormo.className, fontWeight: 600 },
          
        ].map((item, index) => (
          <h3
            key={index}
            className={`text-penengahhp lg:text-penengah ${item.font}`}
            style={{ fontWeight: item.fontWeight }}
          >
            {item.text}
          </h3>
        ))}
      </Marquee>
      <div
        className={`px-5 lg:px-48 py-24 flex flex-col lg:flex-row lg:items-center text-par font-futura`}
  
      >
        <h1>When I'm not coding</h1>
        <Image
          className="mx-auto py-10"
          src={profpic}
          width={400}
          alt="Picture of the author"
        />
        <h1 className="text-right">
          I'm watching <br />
          youtube, playing games <br />
          or reading a book
        </h1>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
