import AvatarSkeleton from "assets/images/avatar.png";

import UserDialog from "components/UserProfileDialog";
import PasswordDialog from "components/ChangePasswordDialog";

import SVG from "designs/SVG";
import ActionsTable from "designs/ActionsTable";
import ArrowIcon from "designs/icons/Arrow";

import useAuth from "hooks/useAuth";

import useStore from "zustand/store";

import {
  Avatar,
  DropdownItem,
  DropdownInfoItem,
  InfoContainer,
  MenuButton,
  Name,
  UserNavContainer,
  Link,
} from "./styles";

import OptionDialog from "./OptionDialog";

interface IUserNavProps {}

const UserInfo: React.FC<IUserNavProps> = props => {
  const { logout } = useAuth();
  const { currentUser } = useStore();

  const handleLogOut = () => {
    logout();
  };

  return (
    <UserNavContainer>
      <ActionsTable
        className="z-50"
        ButtonAction={
          <MenuButton>
            <Avatar src={AvatarSkeleton} />
            <Name>Xin chào, {currentUser?.userInfo?.displayName}</Name>
            <ArrowIcon direction="DOWN" />
          </MenuButton>
        }
        options={[
          {
            Component: (
              <DropdownInfoItem>
                <Avatar src={AvatarSkeleton} isLg />
                <InfoContainer.Container>
                  <InfoContainer.Name>
                    {currentUser?.userInfo?.displayName}
                  </InfoContainer.Name>
                  <InfoContainer.Email>
                    {currentUser?.userInfo?.userName}
                  </InfoContainer.Email>
                </InfoContainer.Container>
              </DropdownInfoItem>
            ),
          },
          {
            Component: (
              <UserDialog
                editField={currentUser?.userInfo}
                ButtonMenu={
                  <DropdownItem>
                    <SVG name="dropdown/user" width={20} height={20} />
                    Thông tin tài khoản
                  </DropdownItem>
                }
                onSuccess={() => {}}
              />
            ),
          },
          {
            Component: (
              <PasswordDialog
                editField={currentUser?.userInfo}
                ButtonMenu={
                  <DropdownItem>
                    <SVG name="dropdown/change" width={20} height={20} />
                    Đổi mật khẩu
                  </DropdownItem>
                }
                onSuccess={() => {}}
              />
            ),
          },
          {
            Component: (
              <DropdownItem>
                <Link href="https://www.google.com/" target="_blank">
                  <SVG name="dropdown/question" width={20} height={20} />
                  Hướng dẫn sử dụng
                </Link>
              </DropdownItem>
            ),
          },
          {
            Component: (
              <OptionDialog
                ButtonMenu={
                  <DropdownItem>
                    <SVG name="dropdown/option" width={20} height={20} />
                    Tùy chọn
                  </DropdownItem>
                }
                onSuccess={() => {}}
              />
            ),
          },
          {
            Component: (
              <DropdownItem onClick={handleLogOut}>
                <SVG name="dropdown/logout" width={20} height={20} />
                Đăng xuất
              </DropdownItem>
            ),
          },
        ]}
        renderItem={option => option.Component}
      />
    </UserNavContainer>
  );
};

export default UserInfo;
