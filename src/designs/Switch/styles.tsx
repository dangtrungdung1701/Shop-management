import styled from "styled-components";
import tw from "twin.macro";

export const SwitchContainer = styled.div<{ active: boolean }>`
  ${tw`w-[40px] h-[22px] shadow-as-border rounded-2xl relative cursor-pointer bg-primary-3`}
  ${({ active }) => (active ? tw`bg-primary-1` : tw`bg-primary-3`)}
`;

export const SwitchDot = styled.div<{ active: boolean }>`
  ${tw`w-[22px] h-[22px] rounded-full  absolute top-0 transition-all duration-200 ease-linear`}
  ${({ active }) =>
    active ? tw`left-[18px] bg-primary-3` : tw`left-[2px] bg-neutral-1`}
`;
