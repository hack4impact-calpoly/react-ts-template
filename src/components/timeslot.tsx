import React from "react";
import timeslots from "./timeslots";

import {
  Wrapper,
  Box,
  // Button,
  // Input,
  // Label,
  // PasswordContainer,
  // EyeSlash,
  // Question,
  // TextLink,
  // ErrorMessage,
} from "./styledComponents";

export default function Timeslot() {
  return (
    <Wrapper>
      <Box>
        {timeslots.map((time) => (
          <Box> {time} </Box>
        ))}
      </Box>
    </Wrapper>
  );
}
