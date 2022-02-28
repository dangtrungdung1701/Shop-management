import React, { useState } from "react";

import Overlay from "components/Overlay";
import { AUTO_CLOSE_POINT } from "common/constants/drawer";

import { useEventListener } from "hooks/useEventListener";

import MenuList from "./MenuList";
import { DrawerContainer } from "./styles";
import useStore from "zustand/store";

interface ILeftSidebar {
  className?: string;
}

const Drawer: React.FC<ILeftSidebar> = props => {
  const { isExtendDrawer, setExtendDrawer } = useStore();

  const [isMobile, setIsMobile] = useState(false);

  useEventListener(
    "resize",
    () => {
      const isMobile = window.innerWidth < Number(AUTO_CLOSE_POINT);
      setIsMobile(isMobile);

      if (isMobile && isExtendDrawer) {
        setExtendDrawer(false);
      }
      if (!isMobile && !isExtendDrawer) [setExtendDrawer(true)];
    },
    {
      runInFirstRender: true,
    },
  );

  return (
    <>
      <DrawerContainer className={isExtendDrawer ? "open" : "close"}>
        <MenuList />
      </DrawerContainer>
      <Overlay
        isOpen={isExtendDrawer && isMobile}
        onClick={() => setExtendDrawer(false)}
      />
    </>
  );
};

export default Drawer;
