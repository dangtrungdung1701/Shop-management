import BaseButton from "designs/BaseButton";
import styled from "styled-components";
import tw from "twin.macro";

export const OptionDropdown = styled(BaseButton)`
  ${tw`flex gap-x-1 flex-row items-center w-full px-1 cursor-pointer hover:bg-neutral-5 py-1`}
`;
