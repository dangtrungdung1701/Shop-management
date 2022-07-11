import { useEffect } from "react";
import jwtDecode from "jwt-decode";

import { getLocalStorage } from "common/utils/auth";

import Breadcrumb from "components/Breadcrumb";
import PageLoading from "components/PageLoading";

import useAuth from "hooks/useAuth";

import useStore from "zustand/store";

import Drawer from "./components/Drawer";
import TopBar from "./components/Header";

import {
  DashboardContainer,
  Viewpoint,
  MainContent,
  ContentWrap,
} from "./styles";

const AdminLayout: React.FC = props => {
  const { children } = props;
  const { isExtendDrawer, uploadProgress } = useStore();
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

  useEffect(() => {
    let listener: EventListener;
    if (uploadProgress) {
      listener = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        const message =
          "Tệp tin vẫn đang được tải lên, bạn có chắc chắn muốn thoát trang ?";
        console.log(e);
        return (e.returnValue = message);
      };
      window.addEventListener("beforeunload", listener);
    }
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, [uploadProgress]);

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
