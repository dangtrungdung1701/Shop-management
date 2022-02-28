import { RadioGroup } from "@headlessui/react";
import { ReactComponentElement, useEffect, useState } from "react";

import {
  GroupRadioButtonContainer,
  Radio,
  Container,
  Label,
  Text,
  Point,
  Description,
  BoxPoint,
  Title,
} from "./styles";

interface ITabProps<T = any> {
  className?: string;
  innerClassName?: string;
  options: IOptions[];
  optionSelected: IOptions | null;
  label?: string;
  onChange: (option: T) => void;
}

export interface IOptions {
  _id?: string;
  label?: string;
  description?: ReactComponentElement<any>;
}

const GroupRadioButton: React.FC<ITabProps> = props => {
  const {
    onChange,
    className = "",
    options,
    optionSelected,
    innerClassName = "flex flex-col gap-1",
    label,
  } = props;
  const [value, setValue] = useState<IOptions>({});

  useEffect(() => {
    if (optionSelected && Object.keys(optionSelected).length > 0) {
      setValue(optionSelected);
    } else {
      options?.length > 0 && setValue(options[0]);
    }
  }, [optionSelected]);
  const handleChange = (option: any) => {
    onChange && onChange(option);
  };
  return (
    <GroupRadioButtonContainer className={className}>
      <Title>{label}</Title>
      <RadioGroup
        value={value}
        className={innerClassName}
        onChange={handleChange}
      >
        {options?.map(option => (
          <RadioGroup.Option value={option}>
            {({ checked }) => (
              <Container>
                <BoxPoint>
                  <Point>
                    <Radio active={checked} />
                  </Point>
                </BoxPoint>

                <Text>
                  <Label>{option?.label}</Label>
                  <Description>{option?.description}</Description>
                </Text>
              </Container>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </GroupRadioButtonContainer>
  );
};

export default GroupRadioButton;
