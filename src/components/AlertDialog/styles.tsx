import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";

export const ElementButton = styled.div`
  ${tw`cursor-pointer`}
`;

export const AlertDialogContainer = styled.div`
  ${tw`box-border w-full p-1 text-left rounded-sm bg-primary-3`}
`;

export const Content = styled.div<{ isDanger?: boolean }>`
  ${tw`p-1 `}
  ${({ isDanger }) => isDanger && tw`text-accent`}
`;

export const Title = styled.p`
  ${tw`font-semibold leading-tight text-xxl phone:text-3xl`}
`;

export const Message = styled.p`
  ${tw`text-md phone:text-lg mt-1 phone:mt-2 mb-1.5 phone:mb-3`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex justify-end`}
`;

export const Button = styled(_Button)`
  ${tw`flex justify-center py-1 ml-1 rounded-sm text-md phone:text-lg`}
`;
