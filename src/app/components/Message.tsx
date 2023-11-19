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
        my-10
    ">
      <Typography>Hey Ahmed!</Typography>

      <Typography className="text-base font-light">
        Someone is sending you a gift from Naseem 🤩🎁.
        <br />
        Please confirm your address so we can deliver it as soon as possible.
      </Typography>

      <Typography className="text-base font-light">
        Order delivery date and time:
        <br />
        <strong className="font-semibold">
          20 November 2023, 17:00 - 21:00
        </strong>
      </Typography>
    </Box>
  );
};

export default Message;
