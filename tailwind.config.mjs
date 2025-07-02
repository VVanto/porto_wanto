/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        streak: "streak 1.5s linear infinite",
        "streak-delay-1": "streak 1.5s linear infinite 0.2s",
        "streak-delay-2": "streak 1.5s linear infinite 0.4s",
        "streak-delay-3": "streak 1.5s linear infinite 0.6s",
        "streak-delay-4": "streak 1.5s linear infinite 0.8s",
      },

      fontFamily: {

        sablon: ["SablonCustom", "sans-serif"],
      },
      colors: {
        yellow: "#F9E400",
        orange: "#e35214",
        red: "#ED3F32",
        white: "#EEEBE3",
        teal: "#0f1f20",
        volt: "#e3f460",
        purple: "#4c4fe5",
        
        pink: "#ED2788",
        midnightGrape: "#1a0e22",
        blue:"#305CDE",
        navy: "#101523",
        beige: "#cfbeb2",
      },
      spacing: {
        550: "550px",
      },
      fontSize: {
        nav: ["3rem", { lineHeight: "3rem", letterSpacing: "0em" }],
        navtext: ["1.5rem", { lineHeight: "4rem", letterSpacing: "-0.01em" }],
        judul: ["5.75rem", { lineHeight: "5rem", letterSpacing: "-4px" }],
        judulhp: ["4rem", { lineHeight: "3.5rem", letterSpacing: "-2.5px" }],
        subjudul: ["2.5rem", { lineHeight: "3.75rem", letterSpacing: "-2px" }],
        subjudulhp: ["2rem", { lineHeight: "3.75rem", letterSpacing: "-2px" }],
        penengah: ["5.5rem", { lineHeight: "6.5rem", letterSpacing: "-2px" }],
        penengahhp: ["3.5rem", { lineHeight: "3rem", letterSpacing: "-2px" }],
        jalan: ["3rem", { lineHeight: "4.2rem", letterSpacing: "-1px" }],
        jalanhp: ["2rem", { lineHeight: "3.2rem", letterSpacing: "-1px" }],
        isi: ["2.5rem", { lineHeight: "3.5rem", letterSpacing: "-1.5px" }],
        isihp: ["1.75rem", { lineHeight: "2rem", letterSpacing: "-1.75px" }],
        par: ["1.5rem", { lineHeight: "1.75rem", letterSpacing: "-1.2px" }],
        parhp: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-1px" }],
        
        akhir: ["8.5rem", { lineHeight: "6rem", letterSpacing: "0em" }],
        akhirhp: ["6.5rem", { lineHeight: "6rem", letterSpacing: "-7px" }],
        footer: ["1.3rem", { lineHeight: "1.5rem", letterSpacing: "-0.08em" }],
        footerhp: ["1.25rem", { lineHeight: "3rem", letterSpacing: "-0.01em" }],
      },
    },
  },
  plugins: [],
};
