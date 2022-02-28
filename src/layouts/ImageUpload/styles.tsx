import styled from "styled-components";
import tw from "twin.macro";

export const ImageUploadLayoutContainer = styled.div<{ disabled: boolean }>`
  ${({ disabled }) => disabled && tw`pointer-events-none opacity-60`}
`;

export const Overlay = styled.div`
  ${tw`absolute top-0 left-0 w-full h-full bg-neutral-1 opacity-40 `}
`;

export const Label = styled.label`
  ${tw`w-full h-full cursor-pointer `}
`;
