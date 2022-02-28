import styled from "styled-components";
import tw from "twin.macro";

export const StatusTagContainer = styled.div<{ active?: boolean }>`
  ${tw`flex justify-center px-[12px] py-[6px] rounded-sm text-md whitespace-nowrap w-max`}
  ${({ active }) =>
    active ? tw`bg-b-1 text-primary-1` : tw`bg-[#FFCF5C33] text-sematic-2`}
`;
