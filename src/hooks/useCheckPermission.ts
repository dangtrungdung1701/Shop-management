import { IPermissionV2Id } from "typings";

const useCheckPermission = (role: IPermissionV2Id, currentUser: any) => {
  let isPermission = false;
  currentUser?.userInfo?.roles?.forEach((item: IPermissionV2Id) => {
    if (item === role) {
      isPermission = true;
    }
  });
  return isPermission;
};

export default useCheckPermission;
