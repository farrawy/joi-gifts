import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const Message = () => {
  return (
    <Box
      className="
      gap-3
        flex
        flex-col
        justify-center
    ">
      <Typography>Hey Ahmed!</Typography>

      <Typography className="text-base font-light">
        Someone is sending you a gift from{" "}
        <span
          className="font-medium text-[#ffd1c6]"
          style={{
            textShadow: "2px 2px 4px #ffd1c666",
          }}>
          Naseem🤩🎁
        </span>
        . Please confirm your address below.
      </Typography>

      <Typography className="font-bold mb-2">
        Delivery:
        <span className="font-semibold text-[#ffd1c6]">
          {" "}
          Nov 20, 17:00 - 21:00
        </span>
      </Typography>
    </Box>
  );
};

export default Message;
