export const randomInteger = (min: number, max: number): number => {
  const randFloat = Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.round(randFloat);
};
