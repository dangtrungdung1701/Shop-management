import { getLocalStorage } from "common/utils/auth";
import Breadcrumb from "components/Breadcrumb";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

import useStore from "zustand/store";

import Drawer from "./components/Drawer";
import TopBar from "./components/Header";

import {
  DashboardContainer,
  Viewpoint,
  MainContent,
  ContentWrap,
} from "./styles";
import useAuth from "hooks/useAuth";
import PageLoading from "components/PageLoading";

const AdminLayout: React.FC = props => {
  const { children } = props;
  const { isExtendDrawer } = useStore();
  const { logout } = useAuth();

  useEffect(() => {
    const isAutoLogin = getLocalStorage()?.autoLogin;
    if (!isAutoLogin) {
      const token = getLocalStorage()?.token;
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const { exp } = decodedToken;
        if (new Date(exp * 1000) < new Date()) {
          logout();
        }
      }
    } else {
      const refreshToken = getLocalStorage()?.refreshToken;
      if (refreshToken) {
        const exp = getLocalStorage()?.expRefreshToken;
        if (new Date(exp) < new Date()) {
          logout();
        }
      }
    }
  }, []);

  return (
    <DashboardContainer>
      <Drawer />
      <Viewpoint isExtendDrawer={isExtendDrawer}>
        <div className="bg-primary-3 shadow-md">
          <ContentWrap>
            <TopBar />
          </ContentWrap>
        </div>
        <ContentWrap>
          <PageLoading />

          <MainContent>
            <Breadcrumb />
            {children}
          </MainContent>
        </ContentWrap>
      </Viewpoint>
    </DashboardContainer>
  );
};

export default AdminLayout;
