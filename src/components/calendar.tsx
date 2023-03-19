import styled from "styled-components";
import Monthly from "./monthlyView";
import Weekly from "./weeklyView";
import logo from "../images/PETlogo2.svg";
import Toggle from "./adminToggle";
import Popup from "./timeslotPopup";

const StyledMonthly = styled.div`
  padding: 6% 6% 8% 0;
`;
const Logo = styled.img`
  position: absolute;
  right: 2%;
  margin: 2% 4% 0 0;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8% 0 0 8%;
`;
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 2% 0 0;
`;

export default function Calendar() {
  return (
    <div>
      <Logo src={logo} />
      <Wrapper>
        <LeftColumn>
          <StyledMonthly>
            <Monthly />
          </StyledMonthly>
          <Toggle />
        </LeftColumn>
        <Weekly startDate={new Date()} />
      </Wrapper>
      <Popup />
    </div>
  );
}
