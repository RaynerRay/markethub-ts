import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Frontend/Navbar";
import Footer from "@/components/Frontend/Footer";
import Providers from "@/components/Providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MarketHub Zimbabwe",
  description: " MarketHub Zimbabwe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>
      <Providers>
      
        {children}
      
        </Providers>
      </body>
    </html>
  );
}