"use client";
import { useRef } from "react";
import Navbar from "@/components/navbar";
import { Montserrat } from "next/font/google";
import Footer from "@/components/footer";
import "@/app/globals.css";
import { EB_Garamond } from "next/font/google";
import { motion, useInView } from "framer-motion";
import ShaderBackground from "@/components/ShaderBackground";

// Fonts
const garam = EB_Garamond({
  weight: ["400"],
  subsets: ["latin"],
});

const mont = Montserrat({
  weight: ["500"],
  subsets: ["latin"],
});

// ── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

// ── WavyText component ──────────────────────────────────────
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

// ── Social link data ────────────────────────────────────────
const socials = [
  { label: "Instagram", href: "https://www.instagram.com/_vvanto_/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nicosuwanto/" },
  { label: "Whatsapp", href: "https://wa.me/+6281323339006" },
  { label: "X", href: "https://x.com/_vvanto_" },
  { label: "Facebook", href: "https://www.facebook.com/nico.wanto.1/?locale=id_ID" },
  { label: "Line", href: "https://line.me/ti/p/QGT4OLRrIi" },
];

function Contact() {
  const headingRef = useRef(null);
  const linksRef = useRef(null);
  const bottomRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const linksInView = useInView(linksRef, { once: true, amount: 0.3 });
  const bottomInView = useInView(bottomRef, { once: true, amount: 0.3 });

  return (
    <div className="text-beige min-h-screen relative">
      {/* ── Shader Background ── */}
      <ShaderBackground speed={0.8} preset="contact" />

      {/* ── Content (above shader) ── */}
      <div className="shader-content">
        <Navbar />

        <div
          className={`grid grid-rows-3 lg:grid-cols-2 lg:grid-rows-2 h-screen ${garam.className}`}
        >
          {/* ── Top-left heading ── */}
          <motion.div
            ref={headingRef}
            className="py-20 px-5 lg:p-20 text-akhirhp lg:text-akhir row-span-1 col-span-1"
            variants={fadeUp}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
          >
            <h1>
              Contact <br /> Me
            </h1>
          </motion.div>

          <div className="max-sm:hidden"></div>

          {/* ── Social links ── */}
          <motion.div
            ref={linksRef}
            className={`py-16 px-5 lg:p-20 text-par ${mont.className}`}
            variants={staggerContainer}
            initial="hidden"
            animate={linksInView ? "visible" : "hidden"}
          >
            <ul>
              {socials.map((item, i) => (
                <motion.li
                  key={item.label}
                  variants={fadeUp}
                  custom={i}
                  className="group w-fit"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block py-1 transition-all duration-300
                               hover:pl-3
                               before:content-[''] before:absolute before:left-0 before:bottom-0
                               before:h-[2px] before:w-0 before:bg-beige before:transition-all before:duration-300
                               hover:before:w-full
                               hover:text-white"
                  >
                    <WavyText text={item.label} />
                    <span className="inline-block ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-beige">
                      ↗
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Bottom-right heading ── */}
          <motion.div
            ref={bottomRef}
            className="py-20 px-5 lg:p-20 text-akhirhp lg:text-akhir row-span-1 col-span-1 flex justify-end items-end text-right"
            variants={fadeUp}
            initial="hidden"
            animate={bottomInView ? "visible" : "hidden"}
            custom={2}
          >
            <h1>
              Nico <br /> Wanto
            </h1>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Contact;
