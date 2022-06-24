type IType = "once" | "weekly" | "monthly";

export interface IRepeatType {
  uid: number;
  id: IType;
  displayName: string;
}

export const repeatType: IRepeatType[] = [
  {
    uid: 1,
    id: "once",
    displayName: "Không lặp lại",
  },
  {
    uid: 2,
    id: "weekly",
    displayName: "Theo tuần",
  },
  {
    uid: 3,
    id: "monthly",
    displayName: "Theo tháng",
  },
];
