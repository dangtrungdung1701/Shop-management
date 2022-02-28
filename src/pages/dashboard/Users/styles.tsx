import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";

export const ButtonAdd = styled(_Button)`
  ${tw`font-normal`}
`;

export const SearchBoxWrapper = styled.div`
  ${tw`w-full flex gap-2 flex-col phone:flex-row`}
`;
