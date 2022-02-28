import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.label`
  ${tw`flex flex-row items-center cursor-pointer`}
`;

export const Input = styled.input<{ primary: boolean }>`
  ${tw`
    h-2 w-2 text-primary-1 
    border border-solid outline-none 
    rounded
    mr-1.5
    cursor-pointer
    focus:outline-none
    focus:ring-0
    disabled:text-opacity-60
    border-primary-1 
  `}
  &:active,
  &:focus-visible {
    transform: scale(0.97);
    ${tw`outline-none`}
  }
`;

export const Label = styled.label`
  ${tw`cursor-pointer text-lg text-neutral-1 font-medium`}
`;
