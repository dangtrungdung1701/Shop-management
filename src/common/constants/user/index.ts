export interface ILevelOption {
  id: number;
  displayName: string;
}

export const CLASS_LIST: ILevelOption[] = [
  {
    id: 2,
    displayName: "Tỉnh/Thành phố",
  },
  {
    id: 3,
    displayName: "Quận/Huyện/Thị Xã",
  },
  {
    id: 4,
    displayName: "Phường/Xã/Thị Trấn",
  },
];

export const CLASS_LIST_OF_PROVINCE: ILevelOption[] = [
  {
    id: 2,
    displayName: "Tỉnh/Thành phố",
  },
  {
    id: 3,
    displayName: "Quận/Huyện/Thị Xã",
  },
];

export const CLASS_LIST_OF_DISTRICT: ILevelOption[] = [
  {
    id: 3,
    displayName: "Quận/Huyện/Thị Xã",
  },
  {
    id: 4,
    displayName: "Phường/Xã/Thị Trấn",
  },
];

export const CLASS_LIST_OF_WARD: ILevelOption[] = [
  {
    id: 4,
    displayName: "Phường/Xã/Thị Trấn",
  },
];

export const INVALID_LOCATION_ID = -1;
