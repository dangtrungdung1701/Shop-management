import { IDay } from "./weekDay";

export const optionMonth = (() => {
  let options: IDay[] = [];
  for (let i = 1; i <= 31; i++) {
    options = [...options, { id: i, displayName: "Ngày " + i }];
  }
  return options;
})();
