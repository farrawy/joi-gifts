"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <nav className="flex justify-center w-full items-center ">
      <Image
        src="/logo-light.png"
        alt="Nasseem Logo"
        width={100}
        height={100}
      />
    </nav>
  );
};

export default Navbar;
