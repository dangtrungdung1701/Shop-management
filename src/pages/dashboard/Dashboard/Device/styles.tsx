import styled from "styled-components";
import tw from "twin.macro";

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
