import { LeftSide, LoginLayoutContainer, RightSide, Content } from "./styles";

interface IAuthLayoutProps {}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <LoginLayoutContainer>
      <LeftSide.Container>
        <LeftSide.Logo name="login/auth-logo.png" />
        <LeftSide.Image name="login/auth-bg.png" className="filter blur-sm" />
      </LeftSide.Container>
      <RightSide>
        <Content>{children}</Content>
      </RightSide>
    </LoginLayoutContainer>
  );
};

export default AuthLayout;
