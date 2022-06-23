type IType = "once" | "weekly" | "monthly";

export interface IRepeatType {
  id: IType;
  displayName: string;
}

export const repeatType: IRepeatType[] = [
  {
    id: "once",
    displayName: "Không lặp lại",
  },
  {
    id: "weekly",
    displayName: "Theo tuần",
  },
  {
    id: "monthly",
    displayName: "Theo tháng",
  },
];
