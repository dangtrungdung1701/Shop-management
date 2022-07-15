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
    displayName: "Quận/Huyện/Thị xã",
  },
  {
    id: 4,
    displayName: "Phường/Xã/Thị trấn",
  },
];

export const CLASS_LIST_OF_PROVINCE: ILevelOption[] = [
  {
    id: 2,
    displayName: "Tỉnh/Thành phố",
  },
  {
    id: 3,
    displayName: "Quận/Huyện/Thị xã",
  },
];

export const CLASS_LIST_OF_DISTRICT: ILevelOption[] = [
  {
    id: 3,
    displayName: "Quận/Huyện/Thị xã",
  },
  {
    id: 4,
    displayName: "Phường/Xã/Thị trấn",
  },
];

export const CLASS_LIST_OF_WARD: ILevelOption[] = [
  {
    id: 4,
    displayName: "Phường/Xã/Thị trấn",
  },
];

export const INVALID_LOCATION_ID = -1;
