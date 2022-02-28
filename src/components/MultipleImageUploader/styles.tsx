import styled from "styled-components";
import tw from "twin.macro";

export const MultipleImageUploaderContainer = styled.div`
  ${tw``}
`;

export const HiddenInput = styled.input`
  ${tw`absolute w-1 h-1 opacity-0 `}
`;

export const ImageUploadContainer = styled.div<{ isError: boolean }>`
  ${tw`
   border-dashed border rounded-lg bg-transparent p-1.5 cursor-pointer w-full min-h-[150px] flex justify-center items-center
  `}
  ${({ isError }) => (isError ? tw`border-sematic-1` : tw` border-neutral-3 `)}
`;

export const PreviewImagesContainer = styled.div`
  ${tw`mt-2 flex flex-row flex-wrap gap-2`}
`;

export const ImageContainer = styled.div`
  ${tw`w-full overflow-hidden relative rounded-md aspect-w-1 aspect-h-1`}
`;

export const Image = styled.img`
  ${tw`w-full h-full object-cover`}
`;

export const SkeletonMessage = styled.p`
  ${tw` mt-1 text-sm font-semibold text-center  `}
`;
