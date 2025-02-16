import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "100": "#111D63",
          "200": "#9CB3D7",
          "300": "#7EC473",
          DEFAULT: "#111D63",
        },
        secondary: "#FBE843",
        black: {
          "100": "#000316",
          "200": "#1E1E1E",
          "300": "#6B7280",
          DEFAULT: "#000000"
        },
        gray: {
          "500": "#6B7280",
          // DEFAULT: "#000000"
        },
        white: {
          "100": "#F7F7F7",
          DEFAULT: "#FFFFFF"
        }
      },
      fontFamily: {
        sharpsans: ["SharpSans", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        100: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        // 200: "2px 2px 0px 2px rgb(0, 0, 0)",
        // 300: "2px 2px 0px 2px rgb(238, 43, 105)"
      },
      backgroundImage: {
        "hero-desktop": "url('/images/Background.webp')",
        "hero-mobile": "url('/images/Background2.webp')",
        "footer-bg": "url('/images/footer-bg.svg')",
        "footer-texture": "url('/images/footer-texture.svg')"
      },
      backgroundSize: {
        "auto-100": "auto 100%"
      },
      backgroundPosition: {
        "center-bottom": "center bottom",
        "center-center": "center center",
        "center-top": "center top",
        "left-bottom": "left bottom",
        "left-center": "left center",
        "left-top": "left top",
        "right-bottom": "right bottom",
        "right-center": "right center",
        "right-top": "right top"
      },
      backgroundClip: {
        "text": "text"
      },
    }
  },
  plugins: []
} satisfies Config;
