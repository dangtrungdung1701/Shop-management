export const calSecondFromTime = (time: Date) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const result = hours * 3600 + minutes * 60 + seconds;
  return result;
};
