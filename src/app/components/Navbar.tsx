"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matchDark = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    setIsDarkMode(matchDark.matches);

    // Add event listener
    matchDark.addEventListener("change", handleThemeChange);

    // Clean up
    return () => {
      matchDark.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <nav className="flex justify-center w-full items-center ">
      <Image
        src={isDarkMode ? "/logo-white.svg" : "/logo-black.svg"}
        alt="Next.js Logo"
        width={80}
        height={80}
      />
    </nav>
  );
};

export default Navbar;
