import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const cookieKey = "KINGIFY_USER_KEY";

export const getUserCookies = (): any => {
  return cookies.get(cookieKey);
};

/**
 * Returns the logged in user
 */
export const getLoggedInAccount = (): any => {
  const account: any = getUserCookies();
  return account
    ? typeof account === "object"
      ? account
      : JSON.parse(account)
    : null;
};

export const getToken = (): string => {
  return getUserCookies()?.token || getUserCookies()?.accessToken || "";
};

export const removeUserCookies = (): void => {
  cookies.remove(cookieKey, { path: "/" });
};
/**
 * Checks if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const user = getLoggedInAccount();

  if (!user) {
    return false;
  }
  try {
    const decoded: any = jwtDecode(user?.token || user?.accessToken || "");
    if (!decoded) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setUserCookies = (data: any): void => {
  const decodedToken: any = jwtDecode(data?.token || data?.accessToken || "");
  const { exp } = decodedToken || {};

  const timeNow = new Date().getTime();
  const shortExp = timeNow + 5 * 3600 * 1000; // 5 hours

  const expires = exp ? new Date(exp * 1000) : new Date(shortExp);

  cookies.set(cookieKey, data, {
    path: "/",
    expires,
  });
};
