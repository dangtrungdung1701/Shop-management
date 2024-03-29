import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { useField, useFormikContext } from "formik";
import vi from "date-fns/locale/vi";
import { DatePicker as NiceDatePicker } from "react-nice-dates";

import FormControlLabel from "common/styles/FormControlLabel";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";

import DatePickerIcon from "icons/DatePicker";

import { Container, InputField, DateInputContainer } from "./styles";

interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  dateData?: Date | null;
  onDateChange?: (newDate: Date) => void;
  autoComplete?: "on" | "off";
  required?: boolean;
}

const DatePicker: React.FC<IInput> = props => {
  const {
    name,
    className,
    label = "",
    minimumDate,
    maximumDate,
    required = false,
    onDateChange,
    disabled,
    dateData = null,
    placeholder = "",
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

  useEffect(() => {
    if (dateData) {
      setDate(new Date(dateData));
    } else {
      setDate(null);
      setFieldValue(name, "");
    }
  }, [dateData]);

  const handleChange = (newDate: Date | null) => {
    setDate(newDate);
    if (newDate) {
      setFieldValue(name, String(newDate));
      onDateChange && onDateChange(newDate);
    } else setFieldValue(name, "");
  };

  return (
    <Container className={`datePicker ${className}`}>
      {label && (
        <FormControlLabel isError={isError} required={required}>
          {label}
        </FormControlLabel>
      )}
      <NiceDatePicker
        date={date as Date}
        onDateChange={handleChange}
        locale={vi}
        format="dd/MM/yyyy"
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      >
        {({ inputProps }) => (
          <DateInputContainer isError={isError} disabled={disabled}>
            <InputField
              autoComplete="off"
              {...(rest as any)}
              {...field}
              {...inputProps}
              placeholder={placeholder}
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
