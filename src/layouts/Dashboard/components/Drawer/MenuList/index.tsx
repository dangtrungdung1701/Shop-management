import { useEffect, useLayoutEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
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
import { dashboardRoutes } from "routes/Routes";
import LogoIcon from "assets/images/logo/logo.png";
import DotIcon from "icons/Dot";
import NestedMenu from "components/NestedMenu";
import { renderItemsForNestedMenu } from "common/functions";
import { PATH } from "common/constants/routes";
import useStore from "zustand/store";

interface IMenuListProps extends RouteComponentProps {}

const dashboardItemsOfNestedMenu = renderItemsForNestedMenu(dashboardRoutes);

const MenuList: React.FC<IMenuListProps> = ({ location }) => {
  const [currentPath, setCurrentPath] = useState("");
  const { toggleExtendDrawer, isMobile } = useStore();

  useLayoutEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      const activeItem = document.querySelector(".drawer-sub-item-active");
      activeItem?.scrollIntoView();
    }, 300);
  }, []);

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
          if (data.hiddenRoute) return <></>;
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
