/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#F9E400",
        orange: "#e35214",
        red: "#ED3F32",
        pink: "#f5a9e3",
        green: "#adc178",
        blue: "#6268fc",
        custard: "#D0F25A",
        tiffany: "#81D8D0",
      },
      spacing: {
        550: "550px",
    
      },
      fontSize: {
        judul: ["5.75rem", { lineHeight: "5rem", letterSpacing: "-4px" }],
        judulhp: ["4rem", { lineHeight: "3.5rem", letterSpacing: "-2.5px" }],
        subjudul: ["3rem", { lineHeight: "3.75rem", letterSpacing: "-2px" }],
        subjudulhp: ["2rem", { lineHeight: "3.75rem", letterSpacing: "-2px" }],
        penengah: ["5.5rem", { lineHeight: "6.5rem", letterSpacing: "-2px" }],
        penengahhp: ["3.5rem", { lineHeight: "3rem", letterSpacing: "-2px" }],
        jalan: ["3rem", { lineHeight: "4.2rem", letterSpacing: "-2px" }],
        jalanhp: ["2rem", { lineHeight: "3.2rem", letterSpacing: "-2px" }],
        isi: ["2.5rem", { lineHeight: "3rem", letterSpacing: "-2px" }],
        isihp: ["1.75rem", { lineHeight: "2rem", letterSpacing: "-2px" }],
        par: ["1.5rem", { lineHeight: "2.25rem", letterSpacing: "-1px" }],
        parhp: ["1.25rem", { lineHeight: "2.25rem", letterSpacing: "-1px" }],
        akhir: ["8.5rem", { lineHeight: "6rem", letterSpacing: "-7px" }],
        akhirhp: ["6.5rem", { lineHeight: "6rem", letterSpacing: "-7px" }],
      },
    },
  },
  plugins: [],
};
