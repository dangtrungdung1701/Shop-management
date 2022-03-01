import styled from "styled-components";
import tw from "twin.macro";
import TimePicker from "rc-time-picker";

export const Container = styled.div`
  ${tw`w-full`}
`;

export const StyledTimePicker = styled(TimePicker)<{
  isError: boolean;
}>`
  & .rc-time-picker-panel-select,
  & .rc-time-picker-input {
    ${tw` cursor-pointer px-1.5 border-[#e0e0e0] py-2.5 text-md placeholder-neutral-3`}
    ${({ isError }) => isError && tw`border border-solid border-sematic-1`}
  }
`;

export default StyledTimePicker;
