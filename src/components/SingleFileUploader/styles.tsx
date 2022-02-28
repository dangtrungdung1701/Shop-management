import styled, { css } from "styled-components";
import tw from "twin.macro";

export const SingleImageUploaderContainer = styled.div`
  ${tw``}
`;

export const HiddenInput = styled.input`
  ${tw`absolute w-1 h-1 opacity-0 `}
`;

export const ImageUploadContainer = styled.div<{ isError: boolean }>`
  ${tw`
   border-dashed border rounded-lg bg-transparent p-1.5 cursor-pointer w-full min-h-[120px] flex justify-center items-center
  `}
  ${({ isError }) =>
    isError
      ? tw`border-sematic-1 text-sematic-1`
      : tw` border-neutral-3 text-neutral-3`}
`;

export const PreviewImage = styled.img`
  ${tw` block w-auto max-h-12 object-cover m-auto h-full `}
`;

export const SkeletonContainer = styled.div`
  ${tw` text-center flex flex-col items-center`}
`;

export const SkeletonMessage = styled.p`
  ${tw` mt-1 text-sm font-semibold  `}
`;
export const SubLabel = styled.span`
  ${tw`text-md font-normal text-neutral-2`}
`;
