import React from "react";
import { EmptyDataContainer, Title, Message } from "./styles";

interface IEmptyDataProps {
  img?: string;
  content?: string;
}
const EmptyData: React.FC<IEmptyDataProps> = props => {
  return (
    <EmptyDataContainer>
      <Title>Dữ liệu của bạn hiện đang trống !</Title>
      <Message>Vui lòng bấm thêm dữ liệu</Message>
    </EmptyDataContainer>
  );
};

export default EmptyData;
