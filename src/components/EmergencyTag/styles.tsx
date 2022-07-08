import styled from "styled-components";
import tw from "twin.macro";

export const StatusTagContainer = styled.div<{ active?: number }>`
  ${tw`flex justify-center px-[12px] py-[6px] rounded-sm text-md whitespace-nowrap w-max`}
  ${({ active }) => active === 1 && tw`bg-[#d7ffd9] text-[#43a047]`}
  ${({ active }) => active === 3 && tw`bg-[#FCDAD5] text-[#E54646]`}
  ${({ active }) => active === 2 && tw`bg-[#eceff1] text-[#62757f]`}
}
`;
