import dayjs from "dayjs";

export const formatDate = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatTime = (time: Date) => {
  return dayjs(time).format("HH:mm:ss");
};

export const getTheNextDay = (date: Date) => {
  return new Date(date.setDate(date.getDate() + 1));
};
