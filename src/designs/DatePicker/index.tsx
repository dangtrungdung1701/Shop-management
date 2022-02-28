import { useField, useFormikContext } from "formik";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import en from "date-fns/locale/en-US";
import { DatePicker as NiceDatePicker } from "react-nice-dates";
import { Container, InputField, DateInputContainer } from "./styles";
import SVG from "designs/SVG";
import FormControlLabel from "common/styles/FormControlLabel";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import DatePickerIcon from "icons/DatePicker";

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
  maximumDate?: Date;
  minimumDate?: Date;
  onDateChange?: (newDate: Date) => void;
  autoComplete?: "on" | "off";
  required?: boolean;
}

const DatePicker: React.FC<IInput> = props => {
  const {
    name,
    className,
    label,
    minimumDate,
    maximumDate,
    required = false,
    onDateChange,
    ...rest
  } = props;
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [date, setDate] = useState<Date | undefined | null>(null);
  const isError: boolean = !!meta.touched && !!meta.error;

  useEffect(() => {
    if (field?.value) {
      setDate(new Date(field.value));
    }
  }, [field?.value]);

  const handleChange = (newDate: Date | null) => {
    setDate(newDate);
    if (newDate) setFieldValue(name, String(newDate));
    else setFieldValue(name, "");
  };

  return (
    <Container className={`datePicker ${className}`}>
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>
      <NiceDatePicker
        date={date as Date}
        onDateChange={handleChange}
        locale={en}
        format="dd/MM/yyyy"
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      >
        {({ inputProps }) => (
          <DateInputContainer isError={isError}>
            <InputField
              autoComplete="off"
              {...(rest as any)}
              {...field}
              {...inputProps}
            />
            <DatePickerIcon />
          </DateInputContainer>
        )}
      </NiceDatePicker>
      {isError && (
        <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
      )}
    </Container>
  );
};

export default DatePicker;
