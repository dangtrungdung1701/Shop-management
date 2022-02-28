import styled, { css } from "styled-components";
import tw from "twin.macro";

export const TextEditorContainer = styled.div<{ sizes: string[] }>`
  ${tw`w-full h-full rounded-lg `}
  .quill {
    .ql-toolbar {
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }

    .ql-container {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      font-size: inherit;

      .ql-editor {
        min-height: 150px;
      }
    }
  }
  ${({ sizes }) =>
    sizes.map(size => {
      const sizeNumber = size.replace(/\D/g, "");
      return css`
        .ql-snow
          .ql-picker.ql-size
          .ql-picker-label[data-value="${size}"]::before,
        .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="${size}"]::before {
          content: "${sizeNumber}";
          font-size: ${size};
        }
      `;
    })}
`;
