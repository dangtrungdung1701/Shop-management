import styled from "styled-components";
import tw from "twin.macro";

export const SearchBoxTableContainer = styled.label<{ isSelect?: boolean }>`
  ${tw`relative grid items-center w-full h-5 px-1 border border-solid rounded-sm focus-within:border-neutral-1 text-neutral-1 border-neutral-3`}
  grid-template-columns: 24px 1fr;
  ${({ isSelect }) => isSelect && tw`h-auto`}
`;

export const Input = styled.input`
  ${tw`w-full text-lg text-neutral-1`}
`;
