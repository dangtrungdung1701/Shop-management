import { useCallback, useState } from "react";

import { PATH } from "common/constants/routes";
import { getLoggedInAccount, isAuthenticated } from "common/utils/auth";

import { useRedirect } from "./useRedirect";

const useAuth = () => {
  const redirect = useRedirect();
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated());
  const [accountInfo, setAccountInfo] = useState<any>(getLoggedInAccount());

  const logout = useCallback(() => {
    redirect(PATH.AUTH.LOGIN);
  }, []);

  return { isAuth, accountInfo, logout };
};

export default useAuth;
