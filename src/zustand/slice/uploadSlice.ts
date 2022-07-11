interface IUploadStore {
  uploadProgress: boolean;
  setUploadProgress: (payload: boolean) => void;
}

const uploadSlice: (set: any, get: any) => IUploadStore = (
  set: any,
  get: any,
) => ({
  uploadProgress: false,

  setUploadProgress: (payload: any) => {
    set((state: any) => {
      state.uploadProgress = payload;
    });
  },
});

export default uploadSlice;
