import Footer from "@/components/Frontend/Footer";
import Navbar from "@/components/Frontend/Navbar";
import NavTop from "@/components/Frontend/NavTop";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);
  
  return (
    <>
      
      <NavTop />
      <Navbar session={session} />
      {children}
      <Footer />
    </>
  );
}