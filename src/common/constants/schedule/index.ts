import { IApprovalStatusType } from "typings/Schedule";

export interface IApprovedStatus {
  id: IApprovalStatusType;
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

export const PENDING_STATUS = 1;
export const APPROVED_STATUS = 2;
export const REFUSE_STATUS = 3;
