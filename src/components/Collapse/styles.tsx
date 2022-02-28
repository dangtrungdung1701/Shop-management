import styled from "styled-components";
import tw from "twin.macro";

export const CollapseContainer = styled.div<{
  smooth: boolean;
  estimateHeight: number;
}>`
  overflow: hidden;
  max-height: 0px;
  height: fit-content;
  transition: max-height 0.3s ease;

  &.open {
    display: block;

    ${({ estimateHeight, smooth }) =>
      smooth && `max-height: ${estimateHeight}px`};
  }
`;
