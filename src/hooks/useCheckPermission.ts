import { useEffect, useState } from "react";
import { IPermissionV2Id } from "typings";

const useCheckPermission = (role: IPermissionV2Id, currentUser: any) => {
  const [isUserPermission, setIsUserPermission] = useState(false);

  useEffect(() => {
    let isPermission = false;
    currentUser?.userInfo?.roles?.forEach((item: IPermissionV2Id) => {
      if (item === role) {
        isPermission = true;
      }
    });
    setIsUserPermission(isPermission);
  }, [currentUser]);
  return isUserPermission;
};

export default useCheckPermission;
