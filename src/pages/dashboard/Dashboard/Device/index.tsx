import React from "react";

import SVG from "designs/SVG";

import { DeviceItem } from "./styles";

interface IDeviceProps {
  title?: string;
  data?: number;
  icon: string;
}

const Device: React.FC<IDeviceProps> = ({ title, data, icon }) => {
  return (
    <DeviceItem.Container>
      <SVG name={icon} width={36} height={36} />
      <DeviceItem.Content>
        <DeviceItem.Label>{title}</DeviceItem.Label>
        <DeviceItem.Number>{data}</DeviceItem.Number>
      </DeviceItem.Content>
    </DeviceItem.Container>
  );
};

export default Device;
