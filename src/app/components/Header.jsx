"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import UserDropdown from "./Dropdown";



export default function Header({ sitedata }) {
  const useData = useSession();
  console.log(useData);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          
          <span className="ml-3 text-xl">{sitedata.name}</span>
        </Link>
        
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900" aria-label="Home">
            Home
          </Link>
          <Link
            href="/Blogs"
            className="mr-5 hover:text-gray-900"
            aria-label="About"
          >
            About
          </Link>
          {useData?.data && useData?.status === 'authenticated'?
          (
        
          <UserDropdown />
        
          )
          : (<Link
            href="/Login"
            className="mr-5 hover:text-gray-900"
            aria-label="About"
          >
            Login
          </Link>)
        }
          
        </nav>
      </div>
    </header>
  );
}
