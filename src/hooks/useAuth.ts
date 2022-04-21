import { useCallback, useEffect, useState } from "react";
import useStore from "zustand/store";
import { useRedirect } from "./useRedirect";

import { PATH } from "common/constants/routes";
import { isAuthenticated } from "common/utils/auth";

const useAuth = () => {
  const redirect = useRedirect();
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated());

  const { isLogoutAction, removeCurrentUser, removePermission } = useStore();

  useEffect(() => {
    if (isLogoutAction) {
      return setIsAuth(false);
    }
    setIsAuth(isAuthenticated());
  }, [isLogoutAction]);

  const logout = useCallback(() => {
    removeCurrentUser();
    removePermission();
    redirect(PATH.AUTH.LOGIN);
  }, []);

  return { isAuth, logout };
};

export default useAuth;
