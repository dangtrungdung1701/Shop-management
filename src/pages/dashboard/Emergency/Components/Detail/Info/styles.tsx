import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const BottomWrapper = styled.div`
  ${tw`flex flex-col phone:flex-row gap-2`}
`;

export const FormLeftWrapper = styled.div`
  ${tw`flex flex-col gap-2 w-full phone:w-1/2`}
`;

export const FormRightWrapper = styled.div`
  ${tw`flex flex-col gap-2 w-full phone:w-1/2`}
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

export const FormTopWrapper = styled.div`
  ${tw`flex flex-col phone:flex-row gap-2`}
`;
