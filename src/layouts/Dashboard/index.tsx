import Breadcrumb from "components/Breadcrumb";

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
  const { isExtendDrawer } = useStore();

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
