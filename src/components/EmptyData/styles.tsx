import styled from "styled-components";
import tw from "twin.macro";

export const EmptyDataContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full py-5 text-center border-t border-solid border-neutral-4`}
`;

export const Title = styled.h1`
  ${tw`font-bold text-3xxl text-neutral-2`}
`;

export const Message = styled.p`
  ${tw`text-lg text-neutral-3`}
`;
