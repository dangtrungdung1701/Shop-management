import { IBreadcrumb } from "typings";

export interface IConfigStore {
  isExtendDrawer: boolean;
  isMobile: boolean;
  breadcrumb: IBreadcrumb;
  loadingTasks: string[];
  setExtendDrawer: (payload: boolean) => void;
  setMobile: (payload: boolean) => void;
  toggleExtendDrawer: () => void;
  setBreadcrumb: (payload: IBreadcrumb) => void;
  startLoading: (payload: string) => void;
  stopLoading: (payload: string) => void;
  clearLoadingTasks: () => void;
}

const configSlice: (set: any, get: any) => IConfigStore = (
  set: any,
  get: any,
) => ({
  isMobile: false,
  isExtendDrawer: true,
  breadcrumb: [],
  loadingTasks: [],
  setMobile: (payload: boolean) => {
    set((state: any) => {
      state.isMobile = payload;
    });
  },
  setExtendDrawer: (payload: boolean) => {
    set((state: any) => {
      state.isExtendDrawer = payload;
    });
  },
  toggleExtendDrawer: () =>
    set((state: any) => {
      state.isExtendDrawer = !state.isExtendDrawer;
    }),
  setBreadcrumb: (payload: IBreadcrumb) => {
    set((state: any) => {
      state.breadcrumb = payload;
    });
  },
  startLoading: (payload: string) => {
    set((state: any) => {
      state.loadingTasks.push(payload);
    });
  },
  stopLoading: (payload: string) => {
    set((state: any) => {
      state.loadingTasks = state.loadingTasks.filter(
        (task: string) => task !== payload,
      );
    });
  },
  clearLoadingTasks: () => {
    set((state: any) => {
      state.loadingTasks = [];
    });
  },
});

export default configSlice;
