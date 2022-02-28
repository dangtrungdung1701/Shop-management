// because React don't export this type. so this is alternative measure
type FileList = any;

export const getFilesFromFileList = (fileList: FileList) => {
  const files: File[] = [];
  for (let i = 0; i < fileList.length; i++) {
    files.push(fileList[i]);
  }
  return files;
};
