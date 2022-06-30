export interface ISourceOption {
  id: string;
  displayName: string;
}

export const optionSource: ISourceOption[] = [
  {
    id: "1",
    displayName: "Tệp tin",
  },
  {
    id: "2",
    displayName: "Link tiếp sóng",
  },
  {
    id: "3",
    displayName: "Kênh FM",
  },
  {
    id: "4",
    displayName: "Mic",
  },
];

export const MIC_SOURCE_ID = "4";
export const FM_SOURCE_ID = "3";
export const LINK_SOURCE_ID = "2";
export const FILE_SOURCE_ID = "1";
