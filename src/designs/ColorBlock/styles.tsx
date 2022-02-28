import styled, { css } from "styled-components";
import tw from "twin.macro";

export const ColorBlockContainer = styled.div<{ size: number }>`
  ${tw`relative flex items-center justify-center overflow-hidden`}
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  `}
`;

export const SubColorBlock = styled.div`
  ${tw`absolute top-0 right-0 w-1/2 h-full z-[0] `}
`;
