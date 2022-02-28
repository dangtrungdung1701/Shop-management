import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import DrawerArrowIcon from "icons/Arrows/DrawerArrow";

export const MenuListContainer = styled.nav`
  ${tw`w-full h-screen overflow-y-auto scrollbar-hide `}
`;

export const List = styled.ul`
  ${tw`flex flex-col gap-1 `}
`;

export const ItemButton = styled(Link)<{ active: boolean; selected: boolean }>`
  ${tw`relative grid items-center w-full gap-2 p-1 text-md font-medium rounded-sm cursor-pointer select-none grid-cols-auto-1fr`}
  ${tw`hover:bg-b-1 hover:text-neutral-1`}
  ${({ active }) =>
    active
      ? tw`text-primary-1 border-r-[5px] border-primary-1`
      : tw`text-neutral-2`}
  ${({ selected }) => selected && tw`bg-b-1`}
  ${({ active }) =>
    active &&
    css`
      svg:not(.arrow) {
        ${tw`text-primary-1`}
      }
    `}
  &:active, &:focus-visible {
    transform: scale(0.97);
    ${tw`outline-none bg-b-1 text-neutral-1`}
  }
`;

export const ArrowIcon = styled(DrawerArrowIcon)<{ isOpen: boolean }>`
  ${tw`absolute transition-transform transform right-1`}
  ${({ isOpen }) => isOpen && "transform: rotate(180deg);"}
`;

export const SubItemButton = styled(Link)<{ active: boolean }>`
  ${tw`relative grid items-center w-full gap-1 px-2 py-1 rounded-sm cursor-pointer select-none text-md grid-cols-auto-1fr`}
  ${tw`hover:bg-b-1 hover:text-neutral-1`}
  ${({ active }) => (active ? tw`text-primary-1` : tw`text-neutral-3`)}
  &:active {
    transform: scale(0.97);
  }
`;

export const LogoImage = styled.img`
  ${tw` my-2  h-8 w-9`}
`;

export const Space = styled.div`
  ${tw`w-full h-5 `}
`;

export const LogoName = styled.span`
  ${tw`font-bold text-4xl text-logo`}
`;

export const LogoContainer = styled.div`
  ${tw`flex items-center`}
`;
