import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`relative flex justify-end`}
`;

export const Overlay = styled.div`
  ${tw`fixed inset-0 z-30`}
`;

export const ActionsContainer = styled.div`
  ${tw`absolute w-max min-w-[120px] z-40 py-1 top-full right-0 overflow-auto rounded-md shadow-lg bg-primary-3 max-h-60 `}
`;
export const ActionButton = styled.div`
  ${tw`w-full py-0.5 px-1`}
`;
