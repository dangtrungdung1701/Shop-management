export interface ICommonStore {
  isSubmitted: boolean;
  actionSuccess: boolean;
  isLoading: boolean;
  isDialogOpen: boolean;
  setActionSuccess: () => void;
  resetAction: () => void;
  setLoading: (payload: boolean) => void;
  setExpandAction: (payload: boolean) => void;
}

const commonSlice: (set: any, get: any) => ICommonStore = (
  set: any,
  get: any,
) => ({
  isSubmitted: false,
  actionSuccess: false,
  isLoading: true,
  isDialogOpen: false,
  setActionSuccess: () => {
    set((state: any) => {
      console.log("actionSuccess");
      state.actionSuccess = true;
    });
  },
  resetAction: () => {
    set((state: any) => {
      state.actionSuccess = false;
    });
  },
  setLoading: (payload: boolean) => {
    set((state: any) => {
      state.isLoading = payload;
    });
  },
  setExpandAction: (payload: boolean) => {
    set((state: any) => {
      state.isDialogOpen = payload;
    });
  },
});

export default commonSlice;
