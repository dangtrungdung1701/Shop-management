import styled from "styled-components";
import tw from "twin.macro";

export const LayoutTableContainer = styled.div`
  ${tw`w-full`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`flex flex-col gap-x-1 gap-y-2 phone:flex-row phone:justify-between items-start`}
  `,
  Title: styled.div`
    ${tw`font-bold text-xxl text-neutral-1 w-full phone:w-auto`}
  `,
};

export const TableWrapper = styled.div`
  ${tw`p-2 mt-2 phone:p-4 bg-primary-3 flex flex-col gap-2 `}
`;
