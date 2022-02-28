import { useCallback, useState } from "react";
import { useField, useFormikContext } from "formik";

import { randomId } from "common/functions";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import {
  RadioButtonContainer,
  Wrapper,
  Input,
  Label,
  StyleRadioButton,
  Title,
} from "./styles";

interface IValue {
  _id?: string;
  name?: string;
  [key: string]: any;
}

interface IRadioButtonProps {
  name: string;
  label?: string;
  values: IValue[];
  onChange?: (value: IValue) => void;
  fieldLabel?: string;
  fieldValue?: string;
  vertical?: boolean;
}

const RadioButton = (props: IRadioButtonProps) => {
  const {
    values = [],
    label,
    name,
    onChange,
    fieldLabel = "name",
    fieldValue = "_id",
    vertical = false,
    ...restProps
  } = props;
  const [checkedIndex, setCheckedIndex] = useState(-1);

  const [id, setId] = useState(randomId());

  const [_, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const isError: boolean = Boolean(!!meta.error && !!meta.touched);

  const handleChange = useCallback((value: IValue, index: number) => {
    setCheckedIndex(index);
    onChange && onChange(value);
    setFieldValue(name, value[fieldValue]);
  }, []);

  return (
    <RadioButtonContainer vertical={vertical}>
      {label && <Title>{label}</Title>}
      {values.map((value, index) => (
        <Wrapper key={`radio-button-${id}-${index}`}>
          <Input
            id={`option-${index}`}
            type="radio"
            value={value}
            onChange={() => handleChange(value, index)}
            name={name}
            {...(restProps as any)}
          />
          <Label htmlFor={`option-${index}`}>
            <StyleRadioButton
              checked={checkedIndex === index}
              isError={isError}
            />
            {value[fieldLabel]}
          </Label>
        </Wrapper>
      ))}
      {isError && (
        <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
      )}
    </RadioButtonContainer>
  );
};

export default RadioButton;
