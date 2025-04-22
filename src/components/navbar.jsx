"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";


function Navbar({ variant = "dark" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDark = variant === "dark";
  const textColor = isDark ? "text-beige" : "text-navy";
  const lineColor = isDark ? "bg-beige" : "bg-navy";
  const underlineColor = isDark ? "after:bg-beige" : "after:bg-navy";

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Tutup menu saat scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);


  

  return (
    <nav className="font-futura relative z-50">
      <div className="px-5 lg:px-10 pt-6 flex items-center justify-between">
        {/* Burger button - always visible */}
        <div className="z-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`relative w-5 h-4 flex flex-col items-center justify-center gap-y-[4px] transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "scale-110" : "scale-100"
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-full ${lineColor} transform origin-center transition duration-300 ease-in-out ${
                mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full ${lineColor} transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full ${lineColor} transform origin-center transition duration-300 ease-in-out ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Nama & Role */}
        <div className="  text-center">
          <h1
            className={`relative inline-block text-nav ${textColor} font-opti`}
          >
           
            Nico Wanto
          </h1>

          <h2 className={`text-navtext ${textColor}`}>
            Frontend Developer & UI/UX Designer
          </h2>
        </div>

        <div className="w-6" />
      </div>

      {/* Sidebar menu (semua mode) */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out backdrop-blur-sm ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-3/4 md:w-1/3 h-full ${
            isDark ? "bg-navy/70" : "bg-beige/80"
          } backdrop-blur-lg shadow-lg pt-28 p-5 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="space-y-6 pl-5 pt-10 text-xl">
            {[
              { href: "/", label: "Home" },
              { href: "/work", label: "Work" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block relative w-fit ${textColor} after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${underlineColor}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={`mt-8 pl-5 ${textColor}`}>
            <h1>Currently working on</h1>
            <h2 className="font-semibold">PT. Pharos Indonesia</h2>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
