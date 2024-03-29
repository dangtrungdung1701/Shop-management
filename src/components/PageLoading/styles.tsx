import styled from "styled-components";
import tw from "twin.macro";

export const PageLoadingContainer = styled.div`
  ${tw`z-[29] fixed bg-b-1 opacity-60 flex items-center justify-center`}
`;

export const SpinnerContainer = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .spinner {
    width: 50px;
    height: 50px;
    animation: rotate 2s infinite;
    & .path {
      stroke: #272727;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
