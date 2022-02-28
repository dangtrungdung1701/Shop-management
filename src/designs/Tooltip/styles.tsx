import styled from "styled-components";
import tw from "twin.macro";

export const TooltipContainer = styled.div`
  ${tw`relative inline-block `}

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

export const TooltipText = styled.p`
  ${tw`absolute z-50 invisible px-1 text-xs text-center transition rounded-sm opacity-0 whitespace-nowrap bg-neutral-2 text-primary-3`}
  top: 140%;

  &::after {
    content: "";
    border-color: transparent transparent rgb(100, 100, 100) transparent;
    left: 50%;
    transform: translateX(-50%);
    margin-left: -4px;
    ${tw`absolute transform border-4 border-solid bottom-full `};
  }
`;
