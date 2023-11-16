import React from "react";

const Message = () => {
  return (
    <div
      className="
      gap-3
        flex
        flex-col
        justify-center
        my-10

    ">
      <h2 className="font-bold text-xl">Hey Ahmed!</h2>

      <p className="text-base font-light">
        Someone is sending you a gift from Joi 🤩🎁.
        <br />
        Please confirm your address so we can deliver it as soon as possible.
      </p>

      <p className="text-base font-light">
        Order delivery date and time:
        <br />
        <strong className="font-semibold">
          20 November 2023, 17:00 - 21:00
        </strong>
      </p>
    </div>
  );
};

export default Message;
