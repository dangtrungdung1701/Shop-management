import styled from "styled-components";
import tw from "twin.macro";
import _IconButton from "designs/IconButton";

export const HeaderContainer = styled.header`
  ${tw`relative flex flex-row items-center`}
`;

export const Title = styled.h1`
  ${tw`mb-2 text-3xl font-bold text-neutral-1`}
`;

export const IconButton = styled(_IconButton)`
  ${tw`absolute right-2 `}
`;
