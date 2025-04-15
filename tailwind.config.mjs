/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        streak: {
          "0%": { transform: "translate3d(0, 0, 0)", opacity: "0.4" },
          "100%": { transform: "translate3d(-80px, 0, 0)", opacity: "0" }, // makin panjang biar dramatis
        },
      },
      animation: {
        streak: "streak 1.5s linear infinite",
        "streak-delay-1": "streak 1.5s linear infinite 0.2s",
        "streak-delay-2": "streak 1.5s linear infinite 0.4s",
        "streak-delay-3": "streak 1.5s linear infinite 0.6s",
        "streak-delay-4": "streak 1.5s linear infinite 0.8s",
      },

      fontFamily: {
        futura: ["FuturaCustom", "sans-serif"],
      },
      colors: {
        yellow: "#F9E400",
        orange: "#e35214",
        red: "#ED3F32",
        pink: "#f5a9e3",
        green: "#adc178",
        blue: "#6268fc",
        custard: "#D0F25A",
        tiffany: "#81D8D0",
        navy: "#000035",
      },
      spacing: {
        550: "550px",
      },
      fontSize: {
        nav: ["2rem", { lineHeight: "4rem", letterSpacing: "0.05em" }],

        judul: ["5.75rem", { lineHeight: "5rem", letterSpacing: "-4px" }],
        judulhp: ["4rem", { lineHeight: "3.5rem", letterSpacing: "-2.5px" }],
        subjudul: ["3rem", { lineHeight: "3.75rem", letterSpacing: "-2px" }],
        subjudulhp: ["2rem", { lineHeight: "3.75rem", letterSpacing: "-2px" }],
        penengah: ["5.5rem", { lineHeight: "6.5rem", letterSpacing: "-2px" }],
        penengahhp: ["3.5rem", { lineHeight: "3rem", letterSpacing: "-2px" }],
        jalan: ["3rem", { lineHeight: "4.2rem", letterSpacing: "-1px" }],
        jalanhp: ["2rem", { lineHeight: "3.2rem", letterSpacing: "-1px" }],
        isi: ["2.5rem", { lineHeight: "3.5rem", letterSpacing: "-1.5px" }],
        isihp: ["1.75rem", { lineHeight: "2rem", letterSpacing: "-1.75px" }],
        par: ["1.5rem", { lineHeight: "2.25rem", letterSpacing: "-1px" }],
        parhp: ["1.25rem", { lineHeight: "2.25rem", letterSpacing: "-1px" }],
        akhir: ["8.5rem", { lineHeight: "6rem", letterSpacing: "-7px" }],
        akhirhp: ["6.5rem", { lineHeight: "6rem", letterSpacing: "-7px" }],
      },
    },
  },
  plugins: [],
};
