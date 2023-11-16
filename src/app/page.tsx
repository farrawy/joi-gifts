import Image from "next/image";
import Navbar from "./components/Navbar";
import Message from "./components/Message";
import Location from "./components/Location";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <Navbar />
      <Box className="p-5 flex flex-col">
        <Message />
        <Location />
      </Box>
    </main>
  );
}
