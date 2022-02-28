import styled from "styled-components";
import tw from "twin.macro";
import { formControlCommon } from "common/styles/FormControl";

export const InputContainer = styled.div<{ isError: boolean }>`
  ${tw`w-full `}
  ${({ isError }) => (isError ? tw`text-sematic-1` : tw`text-neutral-3`)}
`;

export const FieldWrapper = styled.div`
  ${tw`relative w-full `}
`;

export const Label = styled.span`
  ${tw`text-lg font-medium text-neutral-1 `}
`;

export const InputField = styled.textarea<{ isError: boolean; small: boolean }>`
  ${tw` focus:outline-none`}
  ${({ small }) => (small ? tw`min-h-[120px]` : tw`min-h-[220px]`)}
  ${({ isError, disabled }) => formControlCommon(isError, disabled)}
`;

export const IconWrapper = styled.div`
  ${tw`absolute cursor-pointer select-none right-1`}
`;
export const LabelWrapper = styled.div`
  ${tw`flex items-center justify-between`}
`;
export const EventChange = styled.div`
  ${tw`text-lg duration-300 cursor-default hover:text-neutral-2 text-primary-1`}
`;
