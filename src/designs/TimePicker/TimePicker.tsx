import { useField, useFormikContext } from "formik";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Container } from "./styles";
import FormControlLabel from "common/styles/FormControlLabel";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import TimePickerIcon from "icons/TimePicker";

interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  className?: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  onTimeChange?: (newTime: string) => void;
  required?: boolean;
}

const TimePickers: React.FC<IInput> = props => {
  const {
    name,
    className,
    label,
    required = false,
    onTimeChange,
    ...rest
  } = props;
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [dispatchTime, setDispatchTime] = useState("");
  const isError: boolean = !!meta.touched && !!meta.error;

  const handleChange = (value: any) => {
    setDispatchTime(value);
    if (value) setFieldValue(name, value.format("HH:mm:ss"));
    else setFieldValue(name, "");
  };

  return (
    <Container className={`${className}`}>
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>

      <TimePicker
        className="w-full relative"
        popupClassName={className}
        isError={isError}
        value={dispatchTime}
        onChange={handleChange}
        locale="vi"
        clearIcon
        inputIcon={
          <TimePickerIcon className="absolute right-1.5 top-1/2 transform -translate-y-1/2" />
        }
        {...(rest as any)}
      />

      {isError && (
        <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
      )}
    </Container>
  );
};

export default TimePickers;
