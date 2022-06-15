import useStore from "zustand/store";

import UserInfo from "./UserInfo";

import { HeaderContainer, IconWrapper, Icon, Container } from "./styles";

interface ITopBarProps {}

const Header: React.FC<ITopBarProps> = (props: ITopBarProps) => {
  const { toggleExtendDrawer } = useStore();

  return (
    <HeaderContainer>
      <IconWrapper>
        <Icon
          name="common/hamburger"
          width="25px"
          height="25px"
          onClick={() => toggleExtendDrawer()}
        />
      </IconWrapper>
      <Container>
        <UserInfo />
      </Container>
    </HeaderContainer>
  );
};

export default Header;
