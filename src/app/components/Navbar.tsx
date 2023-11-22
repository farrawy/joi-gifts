"use client";

import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-center w-full items-center fixed bg-white">
      <Image src="/logo-light.png" alt="Nasseem Logo" width={64} height={64} />
    </nav>
  );
};

export default Navbar;
