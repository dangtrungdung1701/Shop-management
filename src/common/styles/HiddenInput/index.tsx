import styled from "styled-components";
import tw from "twin.macro";

const HiddenInput = styled.input`
  ${tw`absolute w-1 h-1 opacity-0 `}
`;

export default HiddenInput;
