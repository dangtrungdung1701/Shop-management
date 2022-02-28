import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

export const TabItemContainer = styled(Link)<{ active: boolean }>`
  ${tw`px-2 py-1 font-semibold rounded-t-lg hover:text-neutral-1`}
  ${({ active }) =>
    active ? tw`bg-primary-3 text-neutral-1` : tw`text-neutral-3`}
`;

export const Title = styled.h1`
  ${tw`pb-2 font-bold text-xxl text-neutral-1`}
`;
