import styled from "styled-components";
import tw from "twin.macro";
import _SVG from "designs/SVG";

export const HeaderContainer = styled.header`
  ${tw`relative flex items-center  w-full text-center h-6 text-lg text-primary-1 `}
`;

export const IconWrapper = styled.div`
  ${tw`flex items-center justify-center`}
`;

export const Icon = styled(_SVG)`
  ${tw`w-2.5 h-2.5 cursor-pointer`}
`;

export const Container = styled.div`
  ${tw`flex phone:flex-row items-center phone:items-center justify-end w-full h-full `}
`;
