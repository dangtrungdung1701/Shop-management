import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";

export const TopButton = styled(_Button)`
  ${tw`w-full phone:w-auto flex items-center justify-center whitespace-nowrap phone:whitespace-normal`}
`;

export const SearchBoxWrapper = styled.div`
  ${tw`w-full flex gap-2 flex-col phone:flex-row`}
`;
