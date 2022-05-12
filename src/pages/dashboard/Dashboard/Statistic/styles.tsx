import styled from "styled-components";
import tw from "twin.macro";

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
