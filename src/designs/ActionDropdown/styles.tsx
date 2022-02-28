import styled from "styled-components";
import tw from "twin.macro";
import { Listbox } from "@headlessui/react";

export const SelectContainer = styled.div`
  ${tw`mr-1.5`}
`;
export const ListboxButton = styled(Listbox.Button)`
  ${tw`relative w-full text-left cursor-pointer`}
`;

export const ListboxOptionsContainer = styled.div`
  ${tw`absolute z-30 w-4 py-1 mt-1 overflow-auto border border-solid rounded-lg shadow-md bg-primary-3 max-h-60 focus:outline-none border-neutral-4`}
`;

export const MenuButton = styled.div`
  ${tw`w-full cursor-pointer flex justify-end`}
`;

export const Text = styled.p`
  ${tw`mr-0.5`}
`;

export const MenuItem = styled.div``;
