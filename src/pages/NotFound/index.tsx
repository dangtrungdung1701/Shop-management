import SVG from "designs/SVG";
import { PATH } from "common/constants/routes";

import { Button, Container, Heading, NotFoundContainer } from "./styles";

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <Container>
        <SVG name="404" width="360px" height="361px" />
        <Heading>404. Không tìm thấy trang !</Heading>
        <Button
          to={PATH.DASHBOARD}
          className="justify-center w-full phone:w-auto"
          size="lg"
        >
          Về trang chủ
        </Button>
      </Container>
    </NotFoundContainer>
  );
};

export default NotFound;
