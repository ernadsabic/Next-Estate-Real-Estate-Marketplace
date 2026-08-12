import { Building2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 shadow-xs bg-[#F8FAFC]">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 md:items-center justify-between">
        <Link
          href="/"
          className="text-2xl  font-medium flex gap-2 items-center"
        >
          <Building2 />
          <div>
            Next
            <span className="text-indigo-500 font-bold">Estate</span>
          </div>
        </Link>
        <nav className="flex flex-col md:flex-row gap-4 lg:gap-10 text-md font-medium">
          <Link
            href="/"
            className=" text-gray-600 hover:text-gray-800 transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/marketplace"
            className=" text-gray-600 hover:text-gray-800 transition duration-200"
          >
            Marketplace
          </Link>
          <Link
            href="/properties"
            className=" text-gray-600 hover:text-gray-800 transition duration-200"
          >
            My Properties
          </Link>
        </nav>
        <span className="text-gray-400">
          &copy; {new Date().getFullYear()} NextEstate
        </span>
      </div>
    </footer>
  );
};

export default Footer;
