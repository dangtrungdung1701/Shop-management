export const calSecondFromDateTime = (time: Date) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const result = hours * 3600 + minutes * 60 + seconds;
  return result;
};

export const calSecondFromTimeString = (time: string) => {
  const hours = Number(time.substring(0, 2));
  const minutes = Number(time.substring(3, 5));
  const seconds = Number(time.substring(6, 8));
  const result = hours * 3600 + minutes * 60 + seconds;
  return result;
};
