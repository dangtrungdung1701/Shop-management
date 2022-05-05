import { IPermissionV2, IPermissionV2Id } from "typings";

export const filterPermission = (
  editField: IPermissionV2Id[],
  permission: IPermissionV2[],
) => {
  return editField.map((item: any) => {
    let newItem: IPermissionV2 = {};
    permission.forEach(role => {
      if (role.id === item) {
        newItem = role;
      }
    });
    return newItem;
  });
};
