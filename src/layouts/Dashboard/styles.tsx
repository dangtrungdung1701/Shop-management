import styled from "styled-components";
import tw from "twin.macro";
import { DRAWER_WIDTH, AUTO_CLOSE_POINT } from "common/constants/drawer";

export const DashboardContainer = styled.div`
  ${tw`relative w-full h-full bg-b-1`}
`;

export const Viewpoint = styled.div<{ isExtendDrawer: boolean }>`
  ${tw`z-0 h-screen overflow-auto transition-all duration-300 `}
  @media screen and (min-width: ${AUTO_CLOSE_POINT}px) {
    padding-left: ${({ isExtendDrawer }) =>
      isExtendDrawer ? DRAWER_WIDTH : "0"};
  }
`;

export const ContentWrap = styled.div`
  ${tw`m-auto max-w-[1130px] px-1.5`}
`;

export const MainContent = styled.main`
  ${tw`relative py-2 `}
  min-height: calc(100vh - 60px);
`;
