"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "@/app/components/layout.module.css";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/app/components/Footer";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }) {
  const [siteInfo, setSiteInfo] = useState({ name: "loading..." });

  useEffect(() => {
    const root_url = process.env.NEXT_PUBLIC_WP_JSON_URL + "/?_fields=name";
    axios
      .get(root_url)
      .then((response) => {
        setSiteInfo(response.data);
      })
      
  }, []); // Empty dependency array ensures this runs only once.
  

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
      <SessionProvider>
        <Header sitedata={siteInfo} />
        {children}
        <Footer sitedata={siteInfo} />
        </SessionProvider>
      </body>
    </html>
    
  );
}
