import styled from "styled-components";
import tw from "twin.macro";

export const RadioButtonContainer = styled.div<{ vertical: boolean }>`
  ${({ vertical }) => vertical && tw`flex gap-3`}
`;

export const Wrapper = styled.div`
  ${tw`w-max`}
`;

export const Label = styled.label`
  ${tw`cursor-pointer flex items-center text-lg font-normal`}
`;

export const StyleRadioButton = styled.div<{
  checked: boolean;
  isError: boolean;
}>`
  ${tw`relative w-1.5 h-1.5 rounded-full flex items-center justify-center mr-1`}
  ${({ isError }) =>
    isError ? tw`border border-sematic-1` : tw`border-2 border-primary-1`}
  &::before {
    content: "";
    ${tw`absolute w-[9px] h-[9px] bg-primary-1 rounded-full duration-300`}
    ${({ checked }) =>
      checked ? tw`visible opacity-100` : tw`invisible opacity-0`}
  }
`;

export const Input = styled.input`
  ${tw`hidden`}
`;

export const Title = styled.p`
  ${tw`mb-1`}
`;
