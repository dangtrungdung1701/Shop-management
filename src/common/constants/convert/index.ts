export interface IVoice {
  id?: string;
  name?: string;
}

export interface ISpeed {
  id?: string;
  name?: string;
}

export const optionVoice: IVoice[] = [
  {
    id: "1",
    name: "Nam",
  },
  {
    id: "2",
    name: "Nữ",
  },
];
export const optionSpeed: ISpeed[] = [
  {
    id: "1",
    name: "0.25",
  },
  {
    id: "2",
    name: "0.5",
  },
  {
    id: "3",
    name: "0.75",
  },
  {
    id: "4",
    name: "1.0",
  },
  {
    id: "5",
    name: "1.25",
  },
  {
    id: "6",
    name: "1.5",
  },
  {
    id: "7",
    name: "1.75",
  },
  {
    id: "8",
    name: "2.0",
  },
];
