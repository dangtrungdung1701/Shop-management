import styled from "styled-components";
import tw from "twin.macro";
import { Menu, Transition } from "@headlessui/react";

export const MenuButtonContainer = styled(Menu.Button)`
  ${tw`text-left cursor-pointer focus:outline-none `}
`;

export const MenuItems = styled.div`
  ${tw`absolute z-40 flex flex-col py-1 mt-1 overflow-auto rounded-md shadow-lg bg-primary-3 max-h-60 focus:outline-none`}
`;

export const Button = styled.button<{ active: boolean }>`
  ${tw`w-full text-left`}
  ${({ active }) => active && tw`bg-neutral-4`}
`;
