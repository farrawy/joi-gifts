"use client";
import Navbar from "./components/Navbar";
import Message from "./components/Message";
import Location from "./components/Location";
import { Box } from "@mui/material";
import Whatsapp from "./components/Whatsapp";
import { LoadingProvider } from "@/context/LoadingContext";

export default function Home() {
  return (
    <LoadingProvider>
      <main className="flex   h-full flex-col items-center ">
        <Navbar />
        <Box className="px-3 py-0 my-0 max-w-lg flex flex-col mt-16 overflow-y-hidden">
          <Message />
          <Location />
        </Box>
      </main>
    </LoadingProvider>
  );
}
