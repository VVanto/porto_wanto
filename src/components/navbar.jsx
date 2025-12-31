"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { EB_Garamond } from "next/font/google";

const garam = EB_Garamond({
  weight: ["400"],
  subsets: ["latin"],
});

function WavyText({ text }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-200 ease-in-out group-hover:-rotate-180 group-hover:translate-x-[2px]"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export default function Navbar({ variant = "dark" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const pathname = usePathname();

  const isDark = variant === "dark";
  const textColor = isDark ? "text-beige" : "text-navy";
  const lineColor = isDark ? "bg-beige" : "bg-navy";
  const underlineColor = isDark ? "after:bg-beige" : "after:bg-navy";

  const pageColors = {
    "/": "bg-navy",
    "/work": "bg-teal",
    "/contact": "bg-midnightGrape",
  };

  const currentSidebarColor =
    pageColors[pathname] || (isDark ? "bg-navy" : "bg-beige");

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setRotation(window.scrollY * 0.26);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="font-sablon relative z-50 sticky top-0">
      <div className="px-5 lg:px-10 pt-6 flex items-center justify-between">
        <div className="w-6 lg:hidden" />
        <div>
          <h1
            className={`inline-flex items-center justify-center transform origin-center text-nav ${textColor} ${garam.className}`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.1s linear",
            }}
          >
            ns.
          </h1>
        </div>

        <div className="z-50 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`relative w-6 h-6 flex flex-col items-center justify-center gap-y-[4px] transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "scale-110" : "scale-100"
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-full ${lineColor} transform origin-center transition duration-300 ease-in-out ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full ${lineColor} transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full ${lineColor} transform origin-center transition duration-300 ease-in-out ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className={`hidden lg:flex gap-10 text-navtext ${textColor}`}>
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`group relative w-fit ${textColor} after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${underlineColor}`}
              >
                <WavyText text={item.label} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity backdrop-blur-sm ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-opacity-90 transition-all duration-500 ease-in-out`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 w-3/4 md:w-1/3 h-full ${currentSidebarColor} backdrop-blur-sm bg-opacity-90 shadow-lg pt-28 p-5 transform transition-transform duration-500 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="space-y-6 pl-5 pt-10 text-xl">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group block relative w-fit ${textColor} after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${underlineColor}`}
                >
                  <WavyText text={item.label} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
