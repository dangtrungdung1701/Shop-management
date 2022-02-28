import { useEffect } from "react";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";
import Checkbox from "designs/Checkbox";
import { HiddenInput } from "designs/Select/styles";
import { useField, useFormikContext } from "formik";

interface IMultipleCheckboxProps<T> {
  className?: string;
  name: string;
  label: string;
  options: T[];
  renderOption: (option: T) => string;
  required?: boolean;
  subLabel?: string;
  listOptionsSelected: T[];
  formTarget?: string;
  splitSign?: string;
}

const MultipleCheckbox = <T,>(props: IMultipleCheckboxProps<T>) => {
  const {
    name,
    label,
    options,
    listOptionsSelected,
    renderOption,
    subLabel,
    required,
    formTarget = "_id",
    splitSign = "|",
  } = props;
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isError: boolean = !!meta.touched && !!meta.error;

  useEffect(() => {
    setTimeout(() => {
      const value: string = (listOptionsSelected || [])
        .map(item => (item as any)[formTarget])
        .join(splitSign);
      // setFieldValue cannot set immediately after first render
      setFieldValue(name, value);
    }, 300);
  }, [listOptionsSelected]);

  return (
    <div>
      <FormControlLabel
        subTitle={subLabel}
        isError={isError}
        required={required}
      >
        {label}
      </FormControlLabel>
      <div>
        {options.map(option => {
          return (
            <Checkbox
              initialCheck={
                listOptionsSelected.findIndex(
                  item =>
                    (item as any)?.[formTarget] ===
                    (option as any)?.[formTarget],
                ) >= 0
              }
              onChange={() => {}}
              label={renderOption(option)}
            />
          );
        })}
      </div>

      {isError && (
        <FormControlErrorHelper>{meta?.error}</FormControlErrorHelper>
      )}
      <HiddenInput {...field} />
    </div>
  );
};

export default MultipleCheckbox;
