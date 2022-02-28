import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import { Tab } from "@headlessui/react";
import _Button from "designs/Button";

export const TabContainer = styled.div`
  ${tw`w-full`}
`;
export const Title = styled.h3<{ active: boolean; length: number }>`
  ${tw`flex font-medium text-xl items-center gap-1 py-1 cursor-pointer min-w-max phone:min-w-min phone:w-auto border-primary-1 border-b-4`}
  ${({ active }) => (active ? tw`text-primary-1` : tw`text-neutral-2`)};
  ${({ length, active }) =>
    length > 1 && active ? tw`border-b-2 ` : tw`border-none`};
`;

export const ListTitle = styled(Tab.List)`
  ${tw`flex items-center overflow-auto w-full gap-2.5 font-bold border-b-2 border-neutral-4 text-xxl `}
`;
export const Content = styled(Tab.Panel)`
  ${tw`w-full`}
`;
export const Container = styled.div<{ size: string }>`
  ${tw`w-full  mx-auto my-2.5`}
  ${({ size }) => size === "lg" && tw`max-w-full`}
  ${({ size }) => size === "md" && tw`max-w-72`}
`;
