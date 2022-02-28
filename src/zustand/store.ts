import createStore from "zustand";
import { devtools } from "zustand/middleware";
import { configurePersist } from "zustand-persist";

import authSlice from "./slice/authSlice";
import commonSlice from "./slice/commonSlice";
import configSlice from "./slice/configSlice";

const { persist, purge } = configurePersist({
  storage: localStorage, // use `AsyncStorage` in react native
  rootKey: "root", // optional, default value is `root`
});

const combinedStore = (set: any, get: any) => ({
  ...authSlice(set, get),
  ...commonSlice(set, get),
  ...configSlice(set, get),
});

const useStore = createStore(
  devtools(
    persist(
      {
        key: "auth",
        allowlist: ["accountProfile", "currentUser", "isLogoutAction"],
      },
      combinedStore,
    ),
  ),
);

export default useStore;
