import styled from "styled-components";
import tw from "twin.macro";

import _SVG from "designs/SVG";

// const FormControlErrorHelper = styled.p`
//   ${tw` text-danger text-md ml-1.5 mt-0.5`}
// `;

const Icon = styled(_SVG)`
  ${tw`w-1.5 h-1.5 mr-0.5 inline-block`}
`;

const Error = styled.p`
  ${tw`flex items-center mt-1 font-normal text-md text-sematic-1`}
`;

const FormControlErrorHelper: React.FC = ({ children }) => {
  return (
    <Error>
      <Icon name="common/error" width={16} height={16} />
      {children}
    </Error>
  );
};

export default FormControlErrorHelper;
