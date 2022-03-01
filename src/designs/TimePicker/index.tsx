import styled from "styled-components";
import TimePicker from "./TimePicker";
import tw from "twin.macro";

const StyledTimePicker = styled(TimePicker)`
  & .rc-time-picker-panel-select-option-selected {
    ${tw`bg-[#edeffe]`}
  }

  & .rc-time-picker-panel-select,
  & .rc-time-picker-input {
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  & .rc-time-picker-panel-input {
    ${tw`text-md py-1`}
  }

  & .rc-time-picker-panel-select {
    ${tw`py-2.5 px-0`}
  }
`;

export default StyledTimePicker;
