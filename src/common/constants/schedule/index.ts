export interface IApprovedStatus {
  id: number;
  displayName: string;
}

export const optionApproveStatus: IApprovedStatus[] = [
  {
    id: 1,
    displayName: "Chờ duyệt",
  },
  {
    id: 2,
    displayName: "Đã duyệt",
  },
  {
    id: 3,
    displayName: "Từ chối",
  },
];
