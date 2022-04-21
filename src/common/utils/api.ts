import axios, { AxiosResponse } from "axios";
import queryString from "query-string";

import { REFRESH_TOKEN_URL } from "common/constants/auth";

import { getLocalStorage, updateLocalStorage } from "./auth";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  const token = getLocalStorage()?.token;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse<string>) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async error => {
    const originalConfig = error.config;
    const isAutoLogin = getLocalStorage()?.autoLogin;
    if (
      error.response.status === 401 &&
      !originalConfig._retry &&
      isAutoLogin
    ) {
      originalConfig._retry = true;
      try {
        const payload = {
          token: getLocalStorage()?.token,
          refreshToken: getLocalStorage()?.refreshToken,
        };
        const rs: any = await axiosClient.post(REFRESH_TOKEN_URL, payload);
        updateLocalStorage(rs);
        return axiosClient(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    throw error;
  },
);

export default axiosClient;
