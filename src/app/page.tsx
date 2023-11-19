import Image from "next/image";
import Navbar from "./components/Navbar";
import Message from "./components/Message";
import Location from "./components/Location";
import { Box } from "@mui/material";
import Whatsapp from "./components/Whatsapp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Navbar />
      <Box className="px-3 pb-8 flex flex-col">
        <Message />
        <Location />
      </Box>
    </main>
  );
}
