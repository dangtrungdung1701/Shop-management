import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";

export const ElementButton = styled.div`
  ${tw`cursor-pointer`}
`;

export const AlertDialogContainer = styled.div`
  ${tw`box-border w-full p-2 text-left rounded-sm bg-primary-3`}
`;

export const Button = styled(_Button)`
  ${tw`py-1 w-12 flex justify-center`}
`;
