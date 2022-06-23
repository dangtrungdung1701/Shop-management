import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const Title = styled.h2`
  ${tw`font-medium text-xl`}
`;

export const TopWrapper = styled.div`
  ${tw`my-2.5 flex items-center gap-2`}
`;

export const BottomWrapper = styled.div`
  ${tw`flex flex-col phone:flex-row gap-2`}
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
  ${tw`flex justify-end mt-2.5 flex-col phone:flex-row gap-1 w-full`}
`;

export const Button = styled(_Button)`
  ${tw`py-1 flex justify-center w-full phone:w-15 px-0 phone:px-2.5 whitespace-nowrap`}
`;

export const NoteWrapper = styled.div`
  ${tw`w-full`}
`;
