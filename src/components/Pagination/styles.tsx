import styled from "styled-components";
import tw from "twin.macro";

export const PaginationContainer = styled.div`
  ${tw`w-full flex flex-col phone:flex-row gap-y-1 items-start justify-center phone:justify-end phone:items-center text-neutral-2 text-md`}
`;
export const SizePerPage = {
  Container: styled.div`
    ${tw`flex items-center gap-x-1`}
  `,
  Text: styled.div`
    ${tw``}
  `,
};
export const SizeOnTotal = {
  Container: styled.div`
    ${tw`flex items-center gap-x-2`}
  `,
  Text: styled.div`
    ${tw``}
  `,
};
