import { PATH } from "common/constants/routes";

import Image from "designs/Image";

import { Button, Container, Heading, NotPermissionContainer } from "./styles";

const NotPermission: React.FC = () => {
  return (
    <NotPermissionContainer>
      <Container>
        <Image
          name="not-permission/not-permission.jpg"
          alt="not permission image"
          className="w-39 h-auto max-w-full"
        />
        <Heading>Bạn không có quyền truy cập trang này !</Heading>
        <Button
          to={PATH.DASHBOARD}
          className="justify-center w-full phone:w-auto"
          size="lg"
        >
          Về trang chủ
        </Button>
      </Container>
    </NotPermissionContainer>
  );
};

export default NotPermission;
