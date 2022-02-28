import styled, { css } from "styled-components";
import tw from "twin.macro";

export const formControlCommon = (
  isError: boolean | undefined,
  disabled: boolean | undefined,
) =>
  css`
    ${tw`
      w-full 
      rounded-sm
      border-solid
      border-neutral-4
      bg-primary-3
      px-1.5
      h-5
      focus-within:border-neutral-1
      text-md
      text-neutral-1
      placeholder-neutral-3
      font-normal
    `}
    ${!isError
      ? tw`border-neutral-4 focus:border-neutral-1 group-focus:border-neutral-1`
      : tw`border-sematic-1 focus:border-sematic-1 group-focus:border-sematic-1 `}
    ${disabled && tw`pointer-events-none opacity-60 bg-neutral-4`}
  `;
