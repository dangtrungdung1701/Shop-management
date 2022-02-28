import styled from "styled-components";
import tw from "twin.macro";
import Image from "designs/Image";

export const LoginLayoutContainer = styled.div`
  ${tw`grid w-full h-full min-h-screen grid-cols-1 phone:grid-cols-2`}
`;

export const LeftSide = {
  Container: styled.div`
    ${tw`relative w-full h-full pointer-events-none select-none hidden phone:block`}
  `,
  Image: styled(Image)`
    ${tw`absolute top-0 left-0 w-full h-full object-cover`};
  `,
  Logo: styled(Image)`
    ${tw`absolute z-100 inset-0 m-auto`}
  `,
};

export const RightSide = styled.main`
  ${tw`flex items-center justify-center w-full p-2 `}
`;

export const Content = styled.div`
  ${tw`w-full max-w-45 `}
`;
