"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function Navbar({ variant = "dark" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isDark = variant === "dark";
  const textColor = isDark ? "text-white" : "text-black";
  const lineColor = isDark ? "bg-white" : "bg-black";
  const underlineColor = isDark ? "after:bg-white" : "after:bg-black";

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

  // Ghost effect trigger state
  const [ghosts, setGhosts] = useState([]);

  useEffect(() => {
    const spawnGhost = () => {
      const timeout = Math.random() * 4000 + 2000; // 2s–6s
      setTimeout(() => {
        const id = Math.random().toString(36).substring(7);
        setGhosts((prev) => [...prev, id]);
        setTimeout(() => {
          setGhosts((prev) => prev.filter((g) => g !== id));
        }, 1500); // ghost stay 1.5s
        spawnGhost();
      }, timeout);
    };
    spawnGhost();
  }, []);

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
        <div className="flex-1 text-center">
          <h1
            className={`text-nav uppercase relative inline-block leading-none tracking-tight ${textColor}`}
          >
            {ghosts.map((id, i) => (
              <span
                key={id}
                className={`absolute inset-0 text-[#FFB300] opacity-30 blur-[12px] skew-x-[-12deg] pointer-events-none z-[-1] animate-fade-move`}
                style={{
                  willChange: "transform, opacity",
                }}
                aria-hidden="true"
              >
                NICO SUWANTO
              </span>
            ))}
            NICO SUWANTO
          </h1>

          <h2 className={`text-sm ${textColor}`}>
            Frontend Developer & UI/UX Designer
          </h2>
        </div>

        <div className="w-6"></div>
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
            isDark ? "bg-black/70" : "bg-white/80"
          } backdrop-blur-lg shadow-lg pt-28 p-5 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="space-y-6 text-xl">
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

          <div className={`mt-8 ${textColor}`}>
            <h1>Currently working on</h1>
            <h2 className="font-semibold">PT. Pharos Indonesia</h2>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
