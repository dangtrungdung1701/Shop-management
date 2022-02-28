import React, { useEffect, useState } from "react";
import CheckboxMaterial from "@mui/material/Checkbox";

interface ICheckboxProps {
  isChecked?: boolean | undefined;
  onChange?: (isCheck: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "medium" | "small";
  className?: string;
}

const Checkbox: React.FC<ICheckboxProps> = props => {
  const {
    isChecked = true,
    label = "",
    onChange,
    disabled = false,
    size = "medium",
    className = "",
  } = props;

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    status: boolean,
  ) => {
    setChecked(status);
    onChange && onChange(status);
  };

  return (
    <div className={className}>
      <CheckboxMaterial
        classes={{
          root: `p-0`,
        }}
        disabled={disabled}
        checked={checked}
        onChange={handleChecked}
        color="default"
        size={size}
      />
    </div>
  );
};

export default Checkbox;
