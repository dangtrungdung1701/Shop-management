import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";

export const NotPermissionContainer = styled.div`
  ${tw`h-screen w-screen flex items-center justify-center`}
`;

export const Container = styled.div`
  ${tw`w-full overflow-hidden flex flex-col items-center px-1.5 gap-3 py-1`}
`;

export const Heading = styled.p`
  ${tw`max-w-full text-3xl phone:text-4xl tablet:text-5xl laptop:text-6xl text-neutral-1 font-bold leading-tight text-center`}
`;
export const Button = styled(_Button)`
  ${tw`max-w-full w-45`}
`;
