import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import {
  FieldWrapper,
  InputContainer,
  InputField,
  LabelWrapper,
} from "./styles";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";

type IInput = {
  className?: string;
  label: string | null;
  subLabel?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  hasEvent?: boolean;
  isBorder?: boolean;
  onClickEvent?: () => void;
  onChangeValue?: (value: string | number) => void;
  readonly onChange?: () => void;
  isSummit?: boolean;
  validate?: (value: string) => string | undefined | false;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const SimpleInput: React.FC<IInput> = props => {
  const {
    className,
    type = "text",
    required,
    label = null,
    subLabel = "",
    onChangeValue,
    isBorder = true,
    validate,
    isSummit,
    ...rest
  } = props;

  const [value, setValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const error = validate?.(value);
  const isError = Boolean(error) && isTouch;

  useEffect(() => {
    if (isSummit) {
      setIsTouch(true);
    }
  }, [isSummit]);

  return (
    <InputContainer className={className} isError={isError}>
      <LabelWrapper>
        <FormControlLabel
          subTitle={subLabel}
          isError={isError}
          required={required}
        >
          {label}
        </FormControlLabel>
      </LabelWrapper>
      <FieldWrapper>
        <InputField
          value={value}
          type={type}
          isError={isError}
          isBorder={isBorder}
          onBlur={() => setIsTouch(true)}
          onChange={e => {
            const value = e.target.value || "";
            setValue(value);
            onChangeValue?.(value);
          }}
          {...(rest as any)}
        />
      </FieldWrapper>
      {isError && <FormControlErrorHelper>{error}</FormControlErrorHelper>}
    </InputContainer>
  );
};

export default SimpleInput;
