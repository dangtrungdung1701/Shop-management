import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
export const DialogContainer = styled.div`
  ${tw`bg-primary-3 p-3 rounded-sm`}
`;
export const Form = styled(_Form)`
  ${tw`flex flex-col gap-2`}
`;
