import { AUTH_KEY } from "common/constants/auth";
/**
 * Checks if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const user = getLocalStorage()?.token;
  if (user) {
    return true;
  }
  return false;
};

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || "{}");
};

export const removeLocalStorage = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const updateLocalStorage = (data: any) => {
  const timeNow = new Date().getTime();
  const expRefreshToken = timeNow + 6 * 86400 * 1000; //6 days
  const prevData = getLocalStorage();
  const newData = {
    ...prevData,
    token: data?.token,
    refreshToken: data?.refreshToken,
    expRefreshToken,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(newData));
};
