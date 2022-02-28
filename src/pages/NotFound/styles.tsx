import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";

export const NotFoundContainer = styled.div`
  ${tw`h-screen w-screen flex items-center justify-center`}
`;

export const Container = styled.div`
  ${tw`w-full flex flex-col items-center px-1.5`}
`;

export const Heading = styled.p`
  ${tw`text-3xl phone:text-6xl text-neutral-1 font-bold leading-tight mt-5 mb-8`}
`;
export const Button = styled(_Button)`
  ${tw`w-full max-w-[455px]`}
`;
