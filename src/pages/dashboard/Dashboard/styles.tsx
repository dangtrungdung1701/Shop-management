import styled from "styled-components";
import tw from "twin.macro";

export const DashboardContainer = styled.div`
  ${tw`w-full`}
`;
export const NonBreadcrumb = styled.div`
  ${tw`text-lg text-neutral-2`}
`;
export const DashboardTitle = styled.h2`
  ${tw`text-xxl font-bold leading-none mt-1`}
`;

export const DevicesTitle = styled.div`
  ${tw`text-20 font-bold leading-none mt-4 mb-2`}
`;

export const DevicesStatistics = styled.div`
  ${tw`grid grid-cols-1 gap-2 phone:grid-cols-2 laptop:grid-cols-4`}
`;

export const DeviceItem = {
  Container: styled.div`
    ${tw`flex gap-2 bg-light p-3 rounded-lg`}
  `,
  Content: styled.div`
    ${tw``}
  `,
  Label: styled.div`
    ${tw`font-medium text-primary-3 text-lg`}
  `,
  Number: styled.div`
    ${tw`text-20 font-bold text-primary-3 mt-0.5`}
  `,
};

export const ListStatistics = styled.div`
  ${tw`grid grid-cols-1 phone:grid-cols-2 laptop:grid-cols-3 gap-2 mt-4`}
`;

export const StatisticsItem = {
  Container: styled.div`
    ${tw`relative`}
  `,
  Background: styled.img`
    ${tw`w-full`}
  `,
  Content: styled.div`
    ${tw`absolute top-0 h-full flex flex-col justify-center px-3`}
  `,
  Label: styled.div`
    ${tw`font-medium text-primary-3 text-xl`}
  `,
  Number: styled.div`
    ${tw`text-xxl font-bold text-primary-3 mt-0.5`}
  `,
};
