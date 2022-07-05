import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const Title = styled.h2`
  ${tw`font-medium text-xl`}
`;

export const BottomWrapper = styled.div`
  ${tw`flex flex-col phone:flex-row gap-2 my-2.5`}
`;

export const FormLeftWrapper = styled.div`
  ${tw`flex flex-col gap-2 flex-1`}
`;

export const FormRightWrapper = styled.div`
  ${tw`flex flex-col gap-2 flex-1`}
`;

export const Form = styled(_Form)`
  ${tw`flex flex-col gap-2`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex justify-end mt-2.5`}
`;

export const Button = styled(_Button)`
  ${tw`py-1 flex justify-center ml-1.5 w-15`}
`;

export const ButtonAddTime = styled(_Button)`
  ${tw`py-1 flex justify-center w-full`}
`;

export const ButtonRemove = styled(_Button)`
  ${tw`py-1.5 flex justify-center w-10 h-fit px-0`}
`;

export const AudioWrapper = styled.div`
  ${tw`flex flex-col gap-1 h-auto`}
`;
