import Link from "next/link";
import React from "react";
import { NavigationMenuBar } from "./navigationMenu";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="flex flex-row font-mono justify-between px-12 py-4">
        <Link href="/" className="text-3xl font-bold text-[#393E46]">
          DEB<span className="text-[#929AAB]">DOB</span>
        </Link>
        <NavigationMenuBar />
      </div>
    </nav>
  );
};

export default Navbar;
