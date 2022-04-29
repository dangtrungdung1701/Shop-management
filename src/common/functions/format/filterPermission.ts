import { IPermissionV2 } from "typings";

export const filterPermission = (
  editField: IPermissionV2[],
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
