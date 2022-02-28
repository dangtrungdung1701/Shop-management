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
    w-full aspect-w-1 aspect-h-1 relative bg-neutral-4
  `}
  ${({ isError }) =>
    isError
      ? tw`border-sematic-1 text-sematic-1`
      : tw` border-neutral-3 text-neutral-3`}
`;

export const ImageUploadIcon = styled.img`
  ${tw` absolute w-15 h-15 left-1/2 top-1/2 `}
`;

export const PreviewImage = styled.img`
  ${tw`w-full h-full `}
`;
