import styled from "styled-components";
import tw, { TwStyle } from "twin.macro";
import type { state } from "./index";

const variants: {
  [key in state]: TwStyle;
} = {
  approved: tw`bg-primary-1 text-primary-3`,
  pending: tw`bg-neutral-3`,
  refuse: tw`bg-sematic-1 text-primary-3`,
};

export const StatusTagContainer = styled.div<{ active: state }>`
  ${tw`flex justify-center px-[12px] py-[6px] rounded-sm text-md whitespace-nowrap w-max font-semibold`}
  ${({ active }) => variants[active]}
`;
