import { axiosJSON } from "common/utils/api";

export const getAccessToken = async (data: any) => {
  try {
    const url = `${process.env.REACT_APP_GRAPHQL_URL}/auth/firebase/phone`;
    const response = await axiosJSON({
      url,
      data: JSON.stringify(data),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};
