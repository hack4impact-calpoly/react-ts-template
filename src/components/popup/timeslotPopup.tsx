import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import x from "../../images/X.svg";
import { PopupDiv, PopupBox, X } from "../styledComponents";

const TempButton = styled.button`
  position: absolute;
  top: 10%;
  left: 40%;
`;

export default function Popup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    setOpen(false);
  };

  return (
    <div>
      <TempButton onClick={() => setOpen(true)}>Open popup</TempButton>
      <PopupDiv
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PopupBox>
          <X src={x} onClick={handleClick} />
        </PopupBox>
      </PopupDiv>
    </div>
  );
}
