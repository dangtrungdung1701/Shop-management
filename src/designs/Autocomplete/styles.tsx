import styled from "styled-components";
import tw from "twin.macro";
import { Listbox } from "@headlessui/react";
import { formControlCommon } from "common/styles/FormControl";

export const AutocompleteContainer = styled.div`
  ${tw`w-full `}
`;

export const HiddenInput = styled.input`
  ${tw`absolute w-1 h-1 opacity-0 `}
`;

export const ListboxButton = styled(Listbox.Button)`
  ${tw`relative w-full text-left cursor-pointer`}
`;

export const Text = styled.p`
  ${tw`truncate`}
`;

export const ListboxOptionsContainer = styled(Listbox.Options)`
  ${tw`absolute z-30 w-full py-1 mt-1 overflow-auto border border-solid rounded-lg shadow-md max-h-40 border-neutral-4 bg-primary-3 focus:outline-none `}
`;

export const MenuButton = styled.div<{ isError: boolean; disabled: boolean }>`
  ${({ isError, disabled }) => formControlCommon(isError, disabled)}
  ${tw`grid items-center h-auto min-h-[50px]`}
  grid-template-columns: 1fr 25px;
`;

export const TagContainer = styled.ul`
  ${tw`flex w-full flex-row flex-wrap gap-0.5 my-1`}
`;

export const Tag = styled.li`
  ${tw` h-3 grid  gap-0.5 p-0.5 items-center bg-primary-1 text-primary-3 text-sm font-normal rounded-md truncate max-w-[150px]`}
  grid-template-columns: 1fr 12px;
`;

export const TagText = styled.p`
  ${tw`truncate`}
`;

export const Placeholder = styled.p`
  ${tw`text-neutral-3`}
`;

export const MenuItem = styled.div<{ active?: boolean }>`
  ${tw` w-full px-1.5 py-0.5 text-md font-normal cursor-pointer`}
  ${({ active }) => active && tw`bg-neutral-4`}
`;

export const EmptyData = styled.div`
  ${tw`w-full flex items-center justify-center py-0.5 text-md font-semibold text-neutral-3`}
`;

export const SearchInput = styled.input`
  ${tw`w-full text-md rounded-md p-0.5 bg-neutral-5`}
`;
