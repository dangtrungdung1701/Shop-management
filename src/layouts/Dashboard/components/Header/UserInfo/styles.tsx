import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const UserNavContainer = styled.div`
  ${tw`w-28 z-[1000]`}
`;

export const MenuButton = styled(BaseButton)`
  ${tw`flex flex-row items-center gap-1.5 text-neutral-1 hover:text-primary-1 -mr-1`}
`;

export const Name = styled.p`
  ${tw`block text-lg font-medium`}
`;

// export const DropdownItem = styled(Link)<{ active?: boolean }>`
//   ${tw`w-full whitespace-nowrap text-neutral-1 flex gap-x-1 px-2 py-0.5 text-lg`}
//   ${({ active }) => active && tw`bg-neutral-4`}
// `;
export const DropdownItem = styled.div`
  ${tw`w-full whitespace-nowrap text-neutral-1 flex gap-x-1 pl-2 pr-5 py-0.5 text-lg cursor-pointer hover:bg-neutral-4`}
`;
export const Avatar = styled.img<{ isLg?: boolean }>`
  ${tw`block object-cover rounded-full`}
  ${({ isLg }) => (isLg ? tw`w-5 h-5` : tw`w-2.5 h-2.5`)}
`;
export const DropdownInfoItem = styled.div`
  ${tw`flex gap-1 items-center mb-4 px-2`}
`;
export const InfoContainer = {
  Container: styled.div`
    ${tw`text-neutral-1 text-left`}
  `,
  Name: styled.div`
    ${tw`text-lg font-medium `}
  `,
  Email: styled.div`
    ${tw`text-neutral-2 text-md mt-0.5`}
  `,
};

export const Link = styled.a`
  ${tw`flex gap-1 items-center`}
`;
