import { removeLocalStorage } from "common/utils/auth";

export interface IPermissionV2 {
  id?: string;
  name?: string;
}

export interface IUserStore {
  permission: IPermissionV2[];
  setPermission: (payload: any) => void;
  removePermission: () => void;
}

const userSlice: (set: any, get: any) => IUserStore = (set: any, get: any) => ({
  permission: [],
  setPermission: (payload: any) => {
    set((state: any) => {
      state.permission = payload;
    });
  },
  removePermission: () => {
    set((state: any) => {
      state.permission = [];
    });
  },
});

export default userSlice;
