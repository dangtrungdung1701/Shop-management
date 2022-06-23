export const optionMonth = () => {
  let options: { id: string; displayName: string }[] = [];
  for (let i = 1; i <= 31; i++) {
    options = [...options, { id: i + "", displayName: "Ngày " + i }];
  }
  return options;
};
