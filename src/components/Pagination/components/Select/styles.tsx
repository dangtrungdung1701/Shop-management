import styled from "styled-components";
import tw from "twin.macro";
import { Listbox } from "@headlessui/react";

export const SelectContainer = styled.div`
  ${tw`mr-1.5`}
`;
export const ListboxButton = styled(Listbox.Button)`
  ${tw`relative w-full text-left cursor-pointer`}
`;

export const ListboxOptionsContainer = styled(Listbox.Options)`
  ${tw`absolute bottom-2 z-30 w-4 py-1 mt-1 overflow-auto border border-solid rounded-lg shadow-md bg-primary-3 max-h-60 focus:outline-none border-neutral-4`}
`;

export const MenuButton = styled.div`
  ${tw`grid items-center`}
  grid-template-columns: 1fr 25px;
`;

export const Text = styled.p`
  ${tw`mr-0.5`}
`;

export const MenuItem = styled.div<{ active?: boolean }>`
  ${tw` w-full px-0.5 py-0.5 text-md font-normal cursor-pointer text-center`}
  ${({ active }) => active && tw`bg-neutral-4`}
`;
