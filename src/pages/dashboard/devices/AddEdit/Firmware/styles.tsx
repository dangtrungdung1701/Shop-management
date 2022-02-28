import styled from "styled-components";
import tw from "twin.macro";
import _Button from "designs/Button";

export const Title = styled.h2`
  ${tw`font-medium text-xl`}
`;

export const FormWrapper = styled.div`
  ${tw`flex flex-col phone:flex-row gap-2 my-2.5`}
`;

export const FormLeftWrapper = styled.div`
  ${tw`flex flex-col gap-2 flex-1`}
`;

export const FormRightWrapper = styled.div`
  ${tw`flex flex-col gap-2 flex-1`}
`;

export const Button = styled(_Button)`
  ${tw`py-1 flex justify-center ml-1.5 w-15`}
`;

export const FirmwareWrapper = styled.div`
  ${tw`flex items-end`}
`;
