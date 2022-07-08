import { IEmergencyPrograms } from "typings";

interface IDuplicateStore {
  duplicateList: IEmergencyPrograms[];
  duplicateDialog: boolean;

  setDuplicateDialog: (payload: boolean) => void;
  setDuplicateList: (payload: IEmergencyPrograms[]) => void;
  removeDuplicateList: () => void;
}

const duplicateSlice: (set: any, get: any) => IDuplicateStore = (
  set: any,
  get: any,
) => ({
  duplicateList: [],
  duplicateDialog: false,

  setDuplicateDialog: (payload: boolean) => {
    set((state: any) => {
      state.duplicateDialog = payload;
    });
  },
  setDuplicateList: <T>(payload: T) => {
    set((state: any) => {
      state.duplicateList = payload;
    });
  },
  removeDuplicateList: () => {
    set((state: any) => {
      state.duplicateList = [];
    });
  },
});

export default duplicateSlice;
