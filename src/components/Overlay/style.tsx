import styled from "styled-components";
import tw from "twin.macro";

export const OverlayContainer = styled.div`
  ${tw`fixed inset-0 z-30 invisible transition-opacity opacity-0 bg-[#131313b3]  `}
  &.show {
    ${tw`visible opacity-100`}
  }
`;
