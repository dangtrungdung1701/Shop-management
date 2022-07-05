import { date } from "yup";

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

export const calDateFromSecond = (second: number) => {
  if (second === null) return null;
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const seconds = Math.floor((second % 3600) % 60);
  const newDate = new Date(+year, +month, +day, +hours, +minutes, +seconds);
  return newDate;
};
