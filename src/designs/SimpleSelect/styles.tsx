import styled from "styled-components";
import tw from "twin.macro";
import { Listbox } from "@headlessui/react";
import { formControlCommon } from "common/styles/FormControl";

export const SelectContainer = styled.div`
  ${tw`w-full`}
`;

export const HiddenInput = styled.input`
  ${tw`absolute w-1 h-1 opacity-0 `}
`;

export const ListboxButton = styled(Listbox.Button)`
  ${tw`relative w-full text-left cursor-pointer`}
`;

export const ListboxOptionsContainer = styled(Listbox.Options)`
  ${tw`absolute z-30 w-full py-1 mt-1 overflow-auto border rounded-lg shadow-md bg-primary-3 max-h-60 focus:outline-none border-neutral-4`}
`;

export const MenuButton = styled.div<{
  isError: boolean;
  disabled: boolean;
}>`
  ${tw`grid items-center`}
  ${({ isError, disabled }) => formControlCommon(isError, disabled)}
  grid-template-columns: 1fr 25px;
`;

export const Text = styled.p`
  ${tw`truncate`}
`;

export const Placeholder = styled.p`
  ${tw`truncate text-neutral-3`}
`;

export const MenuItem = styled.div<{ active?: boolean }>`
  ${tw` w-full px-1.5 py-0.5 text-md font-normal cursor-pointer`}
  ${({ active }) => active && tw`bg-neutral-4`}
`;

export const EmptyData = styled.div`
  ${tw`w-full flex items-center justify-center py-0.5 text-md font-semibold text-neutral-3`}
`;
