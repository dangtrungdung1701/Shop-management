import { useState } from "react";
import { toast } from "react-toastify";

import { PATH } from "common/constants/routes";

import useStore from "zustand/store";

import { useRedirect } from "./useRedirect";
import { updateLocalStorage } from "common/utils/auth";
import usePermission from "./usePermission";

const useLogin = () => {
  const { setCurrentUser, setPermission } = useStore();

  const [error, setError] = useState("");

  const redirect = useRedirect();

  const login = (data: any) => {
    if (data) {
      if (
        data.userInfo.region.levelId === 1 ||
        data.userInfo.region.levelId === 0
      ) {
        setError("Tài khoản không có quyền truy cập vào hệ thống !");
        return;
      }
      setCurrentUser(data);
      usePermission().then((res: any) => {
        setPermission(res);
      });
      updateLocalStorage(data);
      toast.dark("Đăng nhập thành công", {
        type: toast.TYPE.SUCCESS,
      });
      redirect(PATH.DASHBOARD);
    } else {
      setError("Sai tài khoản hoặc mật khẩu !");
    }
  };
  return { error, setError, login };
};
export default useLogin;
