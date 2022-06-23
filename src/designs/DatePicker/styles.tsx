import styled from "styled-components";
import tw from "twin.macro";
import { formControlCommon } from "common/styles/FormControl";

export const Container = styled.div`
  ${tw`w-full `}
`;

export const DateInputContainer = styled.label<{
  isError: boolean;
  disabled?: boolean;
}>`
  ${tw`grid items-center border border-neutral-1`}
  ${({ isError, disabled }) => formControlCommon(isError, disabled)}
  ${({ isError }) => isError && tw`text-sematic-1`}
  grid-template-columns: 1fr 24px;
`;

export const InputField = styled.input<{
  isError: boolean;
  disabled?: boolean;
}>`
  /* ${({ isError, disabled }) => formControlCommon(isError, disabled)} */
  ${tw`p-0 font-medium text-neutral-1 text-md placeholder-neutral-3 focus:outline-none focus:ring-transparent bg-transparent`}
  ::placeholder {
    font-weight: normal;
  }
`;
