export interface ISource {
  id?: string;
  displayName?: string;
}

export const optionSource: ISource[] = [
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
];
