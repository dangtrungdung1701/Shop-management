import styled from "styled-components";
import tw from "twin.macro";

export const BreadcrumbContainer = styled.div`
  ${tw`w-full mb-1`}
`;

export const Container = styled.div`
  ${tw`flex flex-row items-center`}
`;

export const ItemWrapper = styled.div<{ lastItem: boolean }>`
  ${tw`text-md text-neutral-1`}
  ${({ lastItem }) =>
    lastItem ? tw`text-opacity-100 font-normal` : tw`text-neutral-2`}
`;

export const Item = styled.p`
  ${tw`cursor-default`}
`;
