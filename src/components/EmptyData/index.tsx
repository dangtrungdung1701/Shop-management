import React from "react";
import { EmptyDataContainer, Title, Message } from "./styles";

interface IEmptyDataProps {
  img?: string;
  content?: string;
}
const EmptyData: React.FC<IEmptyDataProps> = props => {
  return (
    <EmptyDataContainer>
      <Title>Your data is currently empty!</Title>
      <Message>Please click add new data</Message>
    </EmptyDataContainer>
  );
};

export default EmptyData;
