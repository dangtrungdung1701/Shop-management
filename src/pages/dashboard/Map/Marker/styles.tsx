import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";

export const AddressList = styled.ul`
  ${tw`text-lg list-disc mx-1`}
`;

export const AddressItem = styled.li`
  ${tw``}
`;

export const AddressTitle = styled.span`
  ${tw`font-bold`}
`;

export const AddressContent = styled.span`
  ${tw``}
`;

export const DirectButton = styled(_Button)`
  ${tw`font-normal w-full text-center mt-2`}
`;

export const Link = styled.a`
  ${tw``}
`;

export const Text = styled.span`
  ${tw`text-primary-3`}
`;

export const Button = styled(_Button)`
  ${tw`py-1 w-full flex justify-center mt-2`}
`;
