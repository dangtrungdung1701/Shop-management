import styled from "styled-components";
import tw from "twin.macro";

import { ACTIVE_ID, INACTIVE_ID } from "common/constants/device";

export const StatusTagContainer = styled.div<{ active?: number }>`
  ${tw`flex justify-center px-[12px] py-[6px] rounded-sm text-md whitespace-nowrap w-max`}
  ${({ active }) =>
    active === ACTIVE_ID
      ? tw`bg-b-1 text-primary-1`
      : active === INACTIVE_ID
      ? tw`bg-[#FFCF5C33] text-sematic-2`
      : tw`bg-sematic-1 text-neutral-1`}
`;
