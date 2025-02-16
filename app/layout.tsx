import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ProgressBarProvider from "@/components/ProgressBarProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import sharpsans from "./fonts/sharpsan";



export const metadata: Metadata = {
  title: "Enforcal AI",
  description: "Do your business transaction here!!"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`custom-scrollbar ${sharpsans.variable}`}>
      <body className="w-full max-w-full font-sharpsans">
        <Header />
        <ProgressBarProvider>{children}</ProgressBarProvider>
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
