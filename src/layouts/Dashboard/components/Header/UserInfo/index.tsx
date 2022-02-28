import { useEffect, useState } from "react";

import AvatarSkeleton from "assets/images/avatar.png";

import SVG from "designs/SVG";
import ActionsTable from "designs/ActionsTable";

import { useLoading } from "hooks/useLoading";
import useAuth from "hooks/useAuth";

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

import UserDialog from "components/UserProfileDialog";
import PasswordDialog from "components/ChangePasswordDialog";
import OptionDialog from "./OptionDialog";
import ArrowIcon from "designs/icons/Arrow";

interface IUserNavProps {}

const LOAD_DATA = "LOAD_DATA";

const UserInfo: React.FC<IUserNavProps> = props => {
  const { startLoading, stopLoading } = useLoading();
  const { logout } = useAuth();
  const { accountInfo } = useAuth();
  const { userInfo } = accountInfo || {};

  const [user, setUser] = useState<any>(userInfo);

  const { fullName = "", email = "" } = user || {};

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
            <Name>Hi, {fullName}Thien An</Name>
            <ArrowIcon direction="DOWN" />
          </MenuButton>
        }
        options={[
          {
            Component: (
              <DropdownInfoItem>
                <Avatar src={AvatarSkeleton} isLg />
                <InfoContainer.Container>
                  <InfoContainer.Name>{fullName}Thien An</InfoContainer.Name>
                  <InfoContainer.Email>
                    {email}dangthanhthienan
                  </InfoContainer.Email>
                </InfoContainer.Container>
              </DropdownInfoItem>
            ),
          },
          {
            Component: (
              <UserDialog
                editField={user}
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
