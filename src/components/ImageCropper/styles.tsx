import styled from "styled-components";
import tw from "twin.macro";

export const DialogContainer = styled.div`
  ${tw`w-full h-full overflow-hidden rounded-sm bg-b-1`}
`;

export const Content = styled.div`
  ${tw`flex flex-col items-center `}
`;

export const CropperImageContainer = styled.div`
  ${tw`relative w-full h-40 rounded-t-lg bg-neutral-1 `}
`;

export const RangeContainer = styled.div`
  ${tw`w-3/4 p-1 py-2`}
`;

export const ActionButtons = styled.div`
  ${tw`flex flex-row justify-end gap-1 p-2 ml-auto mr-0 w-30 `}
`;
