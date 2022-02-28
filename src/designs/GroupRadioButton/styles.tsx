import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const GroupRadioButtonContainer = styled.div`
  ${tw`w-full `}
`;
export const Radio = styled.p<{ active: boolean }>`
  ${tw`w-full h-full duration-300 rounded-full cursor-pointer`}
  ${({ active }) => (active ? tw`bg-primary-1` : tw`bg-transparent`)}
`;
export const Point = styled.div`
  ${tw`p-[2px] mx-1 flex items-center justify-center w-2 h-2 overflow-hidden border border-solid rounded-full outline-none cursor-pointer  border-primary-1 `}
`;
export const Label = styled.p`
  ${tw` text-md text-neutral-1 font-normal`}
`;
export const Title = styled.p`
  ${tw` text-lg mb-1 text-neutral-1 font-medium`}
`;
export const BoxPoint = styled.p`
  ${tw`w-3`}
`;
export const Text = styled.div`
  ${tw``}
`;
export const Description = styled.div`
  ${tw``}
`;
export const Container = styled.div`
  ${tw`flex justify-start items-start gap-1`}
`;
