import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
export const DialogContainer = styled.div`
  ${tw`p-2 flex flex-col gap-2`}
`;

export const Title = styled.p`
  ${tw`text-neutral-1 text-xxl font-bold`}
`;
export const FormContainer = styled.div``;
export const Form = styled(_Form)`
  ${tw`flex flex-col gap-2`}
`;

export const Other = styled.div`
  ${tw`flex justify-end gap-2`}
`;
