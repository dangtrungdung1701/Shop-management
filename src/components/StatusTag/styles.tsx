import styled from "styled-components";
import tw, { TwStyle } from "twin.macro";

import { state } from "./index";

const variants: {
  [key in state]: TwStyle;
} = {
  idle: tw`bg-[#eceff1] text-[#62757f]`,
  scheduledPlaying: tw`bg-[#d7ffd9] text-[#43a047]`,
  error: tw`bg-[#FCDAD5] text-[#E54646]`,
  emergencyPlaying: tw`bg-b-1 text-primary-1`,
  emergencyStopped: tw`bg-[#ffcc80] text-[#bb4d00]`,
};

export const StatusTagContainer = styled.div<{ active: state }>`
  ${tw`flex justify-center px-[12px] py-[6px] rounded-sm text-md whitespace-nowrap w-max`}
  ${({ active }) => variants[active]}
`;
