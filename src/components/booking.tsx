import React, { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.text`
  background-color: #cce1e7;
  opacity: 70%;
  width: 100%;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  border-bottom: 3px solid #90bfcc;
  font-weight: bold;
`;

export interface BookingProps {
  bookedTime: number;
  booked: boolean;
}

export default function Booking({ bookedTime, booked }: BookingProps) {
  return <StyledDiv>9:00am-10:00am</StyledDiv>;
}
