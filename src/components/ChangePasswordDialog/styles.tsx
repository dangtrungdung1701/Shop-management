import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const ElementWrapper = styled.div`
  ${tw`cursor-pointer`}
`;

export const UserDialogContainer = styled.div`
  ${tw`bg-primary-3 rounded-sm p-3.5`}
`;

export const Form = styled(_Form)`
  ${tw`grid gap-2`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex justify-end mt-2.5`}
`;

export const Button = styled(_Button)`
  ${tw`py-1 w-12 flex justify-center ml-1.5`}
`;
