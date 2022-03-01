import styled from "styled-components";
import TimePicker from "./TimePicker";

const StyledTimePicker = styled(TimePicker)`
  & .rc-time-picker-panel-select-option-selected {
    background-color: #edeffe;
  }

  & .rc-time-picker-panel-select,
  & .rc-time-picker-input {
    padding: 25px 15px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #e0e0e0;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    ::placeholder {
      color: #b1b1b1;
    }
  }

  & .rc-time-picker-panel-input {
    padding: 10px;
    font-size: 14px;
  }

  & .rc-time-picker-panel-select {
    padding: 25px 0;
  }
`;

export default StyledTimePicker;
