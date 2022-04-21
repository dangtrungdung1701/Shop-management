import { removeLocalStorage } from "common/utils/auth";
export interface IAuthStore {
  currentUser: any | null;
  accountProfile: any | null;
  isLogoutAction: boolean;
  removeCurrentUser: () => void;
  setCurrentUser: (payload: any) => void;
}

const authSlice: (set: any, get: any) => IAuthStore = (set: any, get: any) => ({
  currentUser: null,
  accountProfile: null,
  isLogoutAction: false,
  setCurrentUser: (payload: any) => {
    set((state: any) => {
      state.currentUser = payload;
      state.isLogoutAction = false;
    });
  },
  removeCurrentUser: () => {
    set((state: any) => {
      state.currentUser = null;
      state.isLogoutAction = true;
      removeLocalStorage();
    });
  },
});

export default authSlice;
