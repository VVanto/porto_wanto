"use client";
import { useState } from "react";
import Link from "next/link";
import { Manrope } from "next/font/google";
import Image from "next/image";
import profpic from "@/assets/profpic.png";
import Navbar from "@/components/navbar";
import Marquee from "react-fast-marquee";
import { Montserrat } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import Footer from "@/components/footer";

// Fonts
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
const grotesk = Space_Grotesk({
  weight: ["400"],
  subsets: ["latin"],
});

// Komponen WavyText inline
function WavyText({ text }) {
  return (
    <span className="inline-block group">
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
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleHover = (idx) => setActiveIndex(idx);
  const handleLeave = () => setActiveIndex(null);

  const getColumnStyle = (idx) => {
    const base = { transition: "all 0.3s ease", position: "relative" };
    if (activeIndex === null) return base;
    if (activeIndex === idx)
      return { ...base, transform: "scale(1.1)", zIndex: 10 };
    if (idx < activeIndex) return { ...base, transform: "translateX(-20%)" };
    if (idx > activeIndex) return { ...base, transform: "translateX(20%)" };
    return base;
  };

  const marqueeItems = [
    { text: "VIEW MY WORKS ↬", font: manrope.className, fontWeight: 700 },
    { text: "VIEW MY WORKS →", font: mont.className, fontWeight: 500 },
    { text: "VIEW MY WORKS ⇨", font: cormo.className, fontWeight: 600 },
  ];

  return (
    <div className="bg-navy text-beige">
      <Navbar />

      <header className="px-4 py-32 flex flex-col lg:flex-row gap-8 items-center justify-center">
       
        <div
          className={`${grotesk.className} text-left`}
          style={{ fontWeight: 500 }}
        >
          <h1 className="text-judulhp lg:text-judul">
            The Future is <br />
            Built With <br /> Clean Code And <br /> Creativity
          </h1>
        </div>
      </header>

      <div
        className={`${manrope.className} grid self-end text-jalanhp lg:text-jalan`}
      >
        <Marquee autoFill speed={70} className="bg-tiffany text-black">
          <h3>⚫ FRONTEND DEVELOPER</h3>
          <h3>⚫ MOBILE DEVELOPER</h3>
          <h3>⚫ INTERACTIVE DESIGN</h3>
          <h3>⚫ TEAMWORK</h3>
          <h3>⚫ ENGLISH</h3>
          <h3>⚫ UI/UX</h3>
        </Marquee>
        <Marquee
          autoFill
          direction="right"
          speed={70}
          className="bg-purple text-black"
        >
          <h3>⚫ HTML</h3>
          <h3>⚫ CSS</h3>
          <h3>⚫ JAVASCRIPT</h3>
          <h3>⚫ REACT JS</h3>
          <h3>⚫ NEXT JS</h3>
          <h3>⚫ TAILWIND CSS</h3>
          <h3>⚫ VITE</h3>
          <h3>⚫ GIT</h3>
          <h3>⚫ GITHUB</h3>
          <h3>⚫ GITLAB</h3>
          <h3>⚫ FIGMA</h3>
        </Marquee>
      </div>

      <div className={`${grotesk.className}`}>
        <p className="text-isihp font-thin lg:text-isi lg:pr-550 py-20 pb-4 mx-5 lg:mx-20">
          I'm a junior Front-end Developer passionate about learning and growing
          in this field. I believe success comes from hard work and good things
          happen to those who put in the effort. My motto is if you want to win
          the lottery, you need to earn the money to buy a ticket.
        </p>

        <div className="mx-5 lg:mx-20 py-5 border-t border-beige flex flex-col lg:flex-row lg:items-center justify-between">
          <p>SOME PLACE I'VE WORKED FOR</p>
          <h3 className="text-jalanhp lg:text-jalan">
            PT Pharos Indonesia / Freelance
          </h3>
        </div>

        <div className="mx-5 lg:mx-20 py-8 border-t border-beige">
          <p className="mb-5">WHAT I DO</p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 relative">
            {[
              {
                title: "Web Development",
                desc: "Building responsive websites with modern technologies like React and Next.js",
              },
              {
                title: "Mobile Apps",
                desc: "Developing cross-platform mobile apps with React Native",
              },
              {
                title: "UI/UX Design",
                desc: "Creating intuitive interfaces with Figma and prototyping",
              },
              {
                title: "Collaboration",
                desc: "Working in teams using Git and agile methodologies",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-4 ${
                  idx < 3 ? "max-md:border-b lg:border-r border-beige" : ""
                }`}
                style={getColumnStyle(idx)}
                onMouseEnter={() => handleHover(idx)}
                onMouseLeave={handleLeave}
              >
                <h2 className="text-subjudulhp lg:text-subjudul mb-2">
                  {item.title}
                </h2>
                <p className="text-parhp lg:text-par">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee dengan per-letter rotate */}
      <Marquee
        autoFill
        direction="left"
        speed={90}
        className="py-8 bg-white text-black"
      >
        {marqueeItems.map((item, i) => (
          <Link
            key={i}
            href="/work"
            className={`${item.font} text-penengahhp lg:text-penengah inline-block mr-12 group`}
            style={{ fontWeight: item.fontWeight }}
          >
            <WavyText text={item.text} />
          </Link>
        ))}
      </Marquee>

      <div
        className={`px-5 lg:px-48 py-24 flex flex-col lg:flex-row lg:items-center text-par ${grotesk.className}`}
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

      <Footer />
    </div>
  );
}
