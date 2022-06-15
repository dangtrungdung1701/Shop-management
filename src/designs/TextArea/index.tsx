import {
  ChangeEvent,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useEffect,
} from "react";
import { useField } from "formik";

import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";

import {
  FieldWrapper,
  InputContainer,
  InputField,
  LabelWrapper,
  Label,
} from "./styles";

interface ITextArea
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  name: string;
  className?: string;
  label: string | null;
  subTitle?: string | null;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  // use onChangeValue instead of onChange, since Formik will overwrite the onChange
  onChangeValue?: (value: string | number) => void;
  small?: boolean;
  readonly onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<ITextArea> = props => {
  const {
    name,
    className,
    small = false,
    required,
    label = null,
    onChangeValue,
    subTitle = null,
    ...rest
  } = props;

  const [field, meta] = useField(props);

  useEffect(() => {
    onChangeValue && onChangeValue(field.value || "");
  }, [field.value]);

  const isError: boolean = !!meta.touched && !!meta.error;
  return (
    <InputContainer className={className} isError={isError}>
      <LabelWrapper>
        <FormControlLabel
          isError={isError}
          required={required}
          subTitle={subTitle}
        >
          <Label>{label}</Label>
        </FormControlLabel>
      </LabelWrapper>
      <FieldWrapper>
        <InputField
          isError={isError}
          {...(rest as any)}
          {...field}
          small={small}
        />
      </FieldWrapper>
      {isError && (
        <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
      )}
    </InputContainer>
  );
};

export default TextArea;
