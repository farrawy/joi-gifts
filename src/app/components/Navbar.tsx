import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-center w-full items-center pt-5">
      <Image
        src={"/joi-gifts.svg"}
        alt="Next.js Logo"
        width={100}
        height={100}
      />
    </nav>
  );
};

export default Navbar;
