import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ProgressBarProvider from "@/components/ProgressBarProvider";
import sharpsans from "./fonts/sharpsan";
import { AppWrapper } from "@/context";

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
        <AppWrapper>
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </AppWrapper>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
