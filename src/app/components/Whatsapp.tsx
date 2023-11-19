"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type PhoneNumberProps = {
  phoneNumber: string;
  message: string;
};

const Whatsapp = ({ phoneNumber, message }: PhoneNumberProps) => {
  const openWhatsappChat = () => {
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <Box sx={{ position: "fixed", right: 20, bottom: 20, zIndex: 1000 }}>
      <Image
        src={"/whatsapp.png"}
        alt="Whatsapp Icon"
        width={50}
        height={50}
        onClick={openWhatsappChat}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
    </Box>
  );
};

export default Whatsapp;
