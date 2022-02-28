import { HeaderContainer, Title, IconButton } from "./styles";
import SVG from "designs/SVG";

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
