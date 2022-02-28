import { removeUserCookies } from "common/utils/auth";
export interface IAuthStore {
  currentUser: any | null;
  accountProfile: any | null;
  isLogoutAction: boolean;
  removeCurrentUser: () => void;
}

const authSlice: (set: any, get: any) => IAuthStore = (set: any, get: any) => ({
  currentUser: null,
  accountProfile: null,
  isLogoutAction: false,
  removeCurrentUser: () => {
    set((state: any) => {
      state.currentUser = null;
      state.isLogoutAction = true;
      removeUserCookies();
    });
  },
});

export default authSlice;
