import { useEffect, useLayoutEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";

import { renderItemsForNestedMenu } from "common/functions";
import { PATH } from "common/constants/routes";

import LogoIcon from "assets/images/logo/logo.png";

import NestedMenu from "components/NestedMenu";
import DotIcon from "icons/Dot";

import { dashboardRoutes } from "routes/Routes";

import useStore from "zustand/store";

import {
  MenuListContainer,
  ItemButton,
  LogoImage,
  SubItemButton,
  List,
  ArrowIcon,
  Space,
  LogoContainer,
  LogoName,
} from "./styles";
import useCheckPermission from "hooks/useCheckPermission";

interface IMenuListProps extends RouteComponentProps {}

const MenuList: React.FC<IMenuListProps> = ({ location }) => {
  const [dashboardItemsOfNestedMenu, setDashboardItemsOfNestedMenu] = useState(
    renderItemsForNestedMenu(dashboardRoutes),
  );
  const [currentPath, setCurrentPath] = useState("");
  const { toggleExtendDrawer, isMobile, currentUser } = useStore();

  useLayoutEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      const activeItem = document.querySelector(".drawer-sub-item-active");
      activeItem?.scrollIntoView();
    }, 300);
  }, []);

  useEffect(() => {
    if (currentUser && dashboardItemsOfNestedMenu.length > 0) {
      const newDashboardItemsOfNestedMenu = dashboardItemsOfNestedMenu.map(
        item => {
          if (
            item.data.path.includes(PATH.DEVICE.SELF) &&
            !useCheckPermission("DeviceManager", currentUser)
          ) {
            return { ...item, data: { ...item.data, name: "" } };
          }
          if (
            item.data.path.includes(PATH.SOURCE_MANAGEMENT.SELF) &&
            !useCheckPermission("AudioSourceManager", currentUser)
          ) {
            return { ...item, data: { ...item.data, name: "" } };
          }
          if (
            item.data.path.includes(PATH.SCHEDULE.SELF) &&
            !useCheckPermission("ScheduleManager", currentUser)
          ) {
            return { ...item, data: { ...item.data, name: "" } };
          }
          if (
            item.data.path.includes(PATH.EMERGENCY.SELF) &&
            !useCheckPermission("EmergencyOperator", currentUser)
          ) {
            return { ...item, data: { ...item.data, name: "" } };
          }
          if (
            item.data.path.includes(PATH.USER) &&
            !useCheckPermission("UserManager", currentUser)
          ) {
            return { ...item, data: { ...item.data, name: "" } };
          }
          return item;
        },
      );
      setDashboardItemsOfNestedMenu(newDashboardItemsOfNestedMenu);
    }
  }, [currentUser]);
  return (
    <MenuListContainer>
      <Link to={PATH.DASHBOARD}>
        <LogoContainer>
          <LogoImage src={LogoIcon} />
          <LogoName>DFM</LogoName>
        </LogoContainer>
      </Link>
      <List>
        {dashboardItemsOfNestedMenu.map(({ data, items }) => {
          if (data.hiddenRoute || data.name === "") return <></>;
          return (
            <NestedMenu
              key={data.path}
              data={data}
              items={items}
              smooth
              estimateHeight={600}
              checkOpen={data => {
                const isOpen = currentPath.startsWith(data.path);
                return isOpen;
              }}
              renderItem={(data, isOpen, level, hasChildren) => {
                if (data.hiddenRoute) return <></>;
                const active = currentPath.startsWith(data.path);
                const path = hasChildren ? "#" : data.path;
                if (level === 0) {
                  return (
                    <ItemButton
                      active={active}
                      selected={active}
                      to={path}
                      onClick={() =>
                        !hasChildren && isMobile && toggleExtendDrawer()
                      }
                    >
                      {data.Icon}
                      {data.name}
                      {hasChildren && (
                        <ArrowIcon className="arrow" isOpen={isOpen} />
                      )}
                    </ItemButton>
                  );
                }
                return (
                  <SubItemButton
                    key={data.path}
                    to={path}
                    active={active}
                    style={{ paddingLeft: `${level * 50}px` }}
                    className={active ? "drawer-sub-item-active" : ""}
                    onClick={() => isMobile && toggleExtendDrawer()}
                  >
                    <DotIcon />
                    {data.name}
                  </SubItemButton>
                );
              }}
            />
          );
        })}
      </List>
      <Space />
    </MenuListContainer>
  );
};

export default withRouter(MenuList);
