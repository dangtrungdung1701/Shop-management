import { ReactNode } from "react";
import { LayoutTableContainer, Heading, TableWrapper } from "./styles";

interface ILayoutTableProps {
  title?: string;
  buttonMenu?: ReactNode;
  children: ReactNode;
}

const LayoutTable: React.FC<ILayoutTableProps> = ({
  buttonMenu = null,
  title = "",
  children,
}) => {
  return (
    <LayoutTableContainer>
      <Heading.Wrapper>
        <Heading.Title>{title && title}</Heading.Title>
        {buttonMenu && buttonMenu}
      </Heading.Wrapper>
      <TableWrapper>{children}</TableWrapper>
    </LayoutTableContainer>
  );
};

export default LayoutTable;
