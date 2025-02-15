import localFont from "next/font/local";

// Each variant needs a separate entry if you want different weights/styles
const sharpsans = localFont({
  src: [
    {
      path: "./Sharp Sans.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Sharp Sans.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./SharpSansBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Sharp Sans Extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Sharp Sans Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Sharp Sans Thin Italic.otf",
      weight: "100",
      style: "italic",
    },
    // Add more variants if needed
  ],
  variable: "--font-sharpsans", // A custom CSS variable to store the font
});

export default sharpsans;
