import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { useField } from "formik";
import {
  FieldWrapper,
  IconWrapper,
  InputContainer,
  InputField,
  EventChange,
  LabelWrapper,
  SubLabel,
} from "./styles";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";
import HidePasswordIcon from "icons/PasswordEye/HidePassword";
import ShowPasswordIcon from "icons/PasswordEye/ShowPassword";

interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  className?: string;
  label: string | null;
  subLabel?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  hasEvent?: boolean;
  isBorder?: boolean;
  onClickEvent?: () => void;
  // use onChangeValue instead of onChange, since Formik will overwrite the onChange
  onChangeValue?: (value: string | number) => void;
  readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInput> = props => {
  const {
    name,
    className,
    type = "text",
    required,
    label = null,
    subLabel = "",
    hasEvent = false,
    onClickEvent,
    onChangeValue,
    isBorder = true,
    ...rest
  } = props;

  const [field, meta] = useField(props);
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    onChangeValue && onChangeValue(field.value || "");
  }, [field.value]);

  const isError: boolean = !!meta.touched && !!meta.error;
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
        {hasEvent && (
          <EventChange
            onClick={() => {
              onClickEvent && onClickEvent();
            }}
          >
            Change
          </EventChange>
        )}
      </LabelWrapper>

      <FieldWrapper>
        <InputField
          type={isShowPassword ? "text" : type}
          isError={isError}
          isBorder={isBorder}
          {...(rest as any)}
          {...field}
        />
        {type === "password" && (
          <IconWrapper onClick={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </IconWrapper>
        )}
      </FieldWrapper>
      {isError && (
        <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
      )}
    </InputContainer>
  );
};

export default Input;
