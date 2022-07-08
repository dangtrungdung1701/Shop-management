import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";

export const SearchBoxWrapper = styled.div`
  ${tw`w-full flex gap-2 flex-col phone:flex-row`}
`;

export const TopButton = styled(_Button)`
  ${tw`w-full phone:w-auto flex items-center justify-center whitespace-nowrap phone:whitespace-normal`}
`;

export const FormTopWrapper = styled.div`
  ${tw`flex flex-col phone:flex-row gap-2`}
`;
export const FormLeftWrapper = styled.div`
  ${tw`flex flex-col gap-2 flex-1`}
`;
export const FormRightWrapper = styled.div`
  ${tw`flex flex-col gap-2 flex-1`}
`;
