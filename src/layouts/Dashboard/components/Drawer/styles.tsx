import styled from "styled-components";
import tw from "twin.macro";
import { DRAWER_WIDTH } from "common/constants/drawer";

export const DrawerContainer = styled.div`
  ${tw`h-screen z-40 bg-primary-3 transition-transform duration-300 pl-2.5 border border-solid border-neutral-4 fixed left-0 top-0  `}
  width: ${DRAWER_WIDTH};
  &.open {
    transform: none;
  }
  &.close {
    transform: translateX(-${DRAWER_WIDTH});
  }
`;
