import { HeaderContainer, Title } from "./styles";

interface IHeaderProps {
  title: string;
}

const DialogHeader: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default DialogHeader;
