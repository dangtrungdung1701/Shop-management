import styled from "styled-components";
import tw from "twin.macro";

interface IFormLabelProps {
  isError: boolean;
  required: boolean | undefined;
  htmlFor?: string;
  subTitle?: string | null;
}

const FormControlLabel: React.FC<IFormLabelProps> = ({
  children,
  required,
  htmlFor,
  isError,
  subTitle,
}) => {
  if (!children) return null;

  return (
    <FormLabelContainer htmlFor={htmlFor} isError={isError}>
      {children}
      {required && <RequireLabel>*</RequireLabel>}
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </FormLabelContainer>
  );
};

export default FormControlLabel;

const FormLabelContainer = styled.label<{ isError: boolean }>`
  ${tw`block font-medium text-lg mb-0.5`}
  ${({ isError }) => (isError ? tw`text-sematic-1` : tw`text-neutral-1`)}
`;

const RequireLabel = styled.span`
  ${tw`text-xs font-semibold text-sematic-1 ml-0.5`}
`;

const SubTitle = styled.span`
  ${tw`text-md ml-0.5 text-neutral-3 font-normal`}
`;
