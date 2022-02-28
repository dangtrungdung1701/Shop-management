import styled from "styled-components";
import { Form as _Form } from "formik";
import tw from "twin.macro";
import _Button from "designs/Button";

export const Form = styled(_Form)`
  ${tw`flex flex-col gap-4`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex justify-end mt-2.5 w-auto`}
`;

export const Button = styled(_Button)`
  ${tw`py-1 w-12 flex justify-center ml-1.5`}
`;

export const SliderWrapper = styled.div`
  ${tw`flex flex-col-reverse gap-2 phone:flex-row items-end`}
`;

export const FieldWrapper = styled.div`
  ${tw`flex flex-col gap-2`}
`;

export const Title = styled.p`
  ${tw`text-xxl font-bold`}
`;
