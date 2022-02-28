import styled from "styled-components";
import tw from "twin.macro";
import { formControlCommon } from "common/styles/FormControl";

export const InputContainer = styled.div<{ isError: boolean }>`
  ${tw`w-full `}
  ${({ isError }) => (isError ? tw`text-sematic-1` : tw`text-neutral-3`)}
`;

export const FieldWrapper = styled.div`
  ${tw`relative flex flex-row items-center w-full`}
`;

export const InputField = styled.input<{ isError: boolean; isBorder: boolean }>`
  ${tw`focus:outline-none`}
  ${({ isError, disabled }) => formControlCommon(isError, disabled)}
  ${({ isBorder }) => !isBorder && tw`border-0`}
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
export const SubLabel = styled.span`
  ${tw`font-normal phone:ml-0.5 text-md text-neutral-3`}
`;
