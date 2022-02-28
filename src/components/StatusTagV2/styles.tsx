import styled from "styled-components";
import tw, { TwStyle } from "twin.macro";
import type { state } from "./index";

const variants: {
  [key in state]: TwStyle;
} = {
  active: tw`bg-[#33CCCC1A] text-primary-1`,
  pending: tw`bg-[#FFCF5C4D] text-sematic-2`,
  locked: tw`bg-[#E40F0A4D] text-[#E40F0A]`,
  requestedToEdit: tw`bg-[#38AE0E1A] text-sematic-3`,
};

export const StatusTagContainer = styled.div<{ active: state }>`
  ${tw`flex justify-center px-[12px] py-[6px] rounded-sm text-md whitespace-nowrap w-max`}
  ${({ active }) => variants[active]}
`;
