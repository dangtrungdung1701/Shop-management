import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
  useEffect,
} from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";
import moment, { Moment } from "moment";

import tw from "twin.macro";

import FormControlLabel from "common/styles/FormControlLabel";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";

import TimePickerIcon from "icons/TimePicker";

import { Container, StyledTimePicker } from "./styles";

import "rc-time-picker/assets/index.css";

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
  required?: boolean;
  minTime?: string;
  initValue?: Date;
  onTimeChange?: (newTime: Date) => void;
}

const TimePickers: React.FC<IInput> = props => {
  const {
    name,
    className,
    label,
    required = false,
    minTime = "",
    initValue,
    onTimeChange,
    ...rest
  } = props;
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [dispatchTime, setDispatchTime] = useState<Moment>();
  const isError: boolean = !!meta.touched && !!meta.error;

  useEffect(() => {
    if (initValue) {
      setDispatchTime(moment(initValue));
      setFieldValue(name, initValue);
    }
  }, []);

  const handleChange = (value: Moment) => {
    setDispatchTime(value);
    onTimeChange && onTimeChange(value.toDate());
    if (value) setFieldValue(name, value.format("HH:mm:ss"));
    else setFieldValue(name, "");
  };

  const getDisabledHours = () => {
    let hours = [];
    for (let i = 0; i < +minTime.substring(0, 2); i++) {
      hours.push(i);
    }
    return hours;
  };

  const getDisabledMinutes = () => {
    if (dispatchTime) {
      const hour = moment(dispatchTime).hours();
      if (+minTime.substring(0, 2) === hour) {
        var minutes = [];
        for (let i = 0; i <= +minTime.substring(3, 5); i++) {
          minutes.push(i);
        }
      }
    }
    return minutes;
  };

  return (
    <Container className={`${className}`}>
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>

      <StyledTimePicker
        className={`w-full relative`}
        popupClassName={className}
        isError={isError}
        value={dispatchTime}
        onChange={handleChange}
        locale="vi"
        clearIcon={<div></div>}
        disabledHours={getDisabledHours}
        disabledMinutes={getDisabledMinutes}
        inputIcon={
          <TimePickerIcon className="cursor-pointer absolute right-1.5 top-1/2 transform -translate-y-1/2" />
        }
        {...(rest as any)}
      />

      {isError && (
        <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
      )}
    </Container>
  );
};

const StyledTimePickers = styled(TimePickers)`
  & .rc-time-picker-panel-select-option-selected {
    ${tw`bg-[#edeffe]`}
  }
  & .rc-time-picker-panel-input {
    ${tw`text-md py-1 font-medium`}
  }
  & .rc-time-picker-panel-select {
    ${tw`py-2.5 px-0`}
  }
`;

export default StyledTimePickers;
