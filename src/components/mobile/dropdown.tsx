/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import styled from "styled-components";

export const DropdownWrapper = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`;

// padding: 0.3rem;
// box-sizing: border-box;
// background: #ffffff;
// border: 1px solid #bababa;
// border-radius: 7px;
// width: 41%;
// height: 30px;
// font-family: "Rubik";
// font-style: normal;
// font-weight: 500;
// font-size: 16px;
// line-height: 19px;
// color: #1b4c5a;
// margin-top: -9%;
// vertical-align: bottom;
// margin-left: 50%;
// display: inline-block;

export const StyledSelect = styled.select`
  max-width: 50%;
  width: 41%;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #bababa;
  border-radius: 7px;
  height: 30px;
  padding-left: 1rem;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 1rem;
  margin-left: 50%;
  margin-top: -10%;
  color: #1b4c5a;
`;

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")};
`;

export const StyledLabel = styled.label`
  margin-bottom: 1rem;
`;

// export const StyledButton = styled.input`
//   max-width: 50%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   border: solid 2px blue;
//   padding: 0.5rem;
//   border-radius: 1rem;
// `;

export function Dropdown(props: {
  action?: any;
  onChange?: any;
  formLabel?: any;
  children?: JSX.Element[];
}) {
  return (
    <DropdownWrapper action={props.action} onChange={props.onChange}>
      <StyledLabel htmlFor="services">{props.formLabel}</StyledLabel>
      <StyledSelect>{props.children}</StyledSelect>
      {/* <StyledButton type="submit" value={props.buttonText} /> */}
    </DropdownWrapper>
  );
}

export function Option(props: {
  selected: boolean | undefined;
  value: string;
}) {
  return <StyledOption selected={props.selected}>{props.value}</StyledOption>;
}
