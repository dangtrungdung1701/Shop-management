import { useEffect, useState } from "react";
import { Container, Input, Label } from "./styles";
import { randomId } from "common/functions";

interface ICheckbox {
  initialCheck?: boolean;
  className?: string;
  primary?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<ICheckbox> = props => {
  const {
    className,
    label = "",
    initialCheck,
    onChange,
    primary = false,
    disabled = false,
  } = props;
  const [isChecked, setIsChecked] = useState(initialCheck);
  const [id] = useState(randomId());

  useEffect(() => {
    setIsChecked(initialCheck);
  }, [initialCheck]);

  const handleChange = () => {
    onChange && onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <Container className={className}>
      <Input
        type="checkbox"
        primary={primary}
        id={id}
        checked={isChecked}
        defaultChecked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <Label htmlFor={id} className="prevent-highlight">
        {label}
      </Label>
    </Container>
  );
};

export default Checkbox;
