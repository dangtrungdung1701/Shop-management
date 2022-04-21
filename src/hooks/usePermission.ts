import axiosClient from "common/utils/api";

const usePermission = async () => {
  try {
    const response = axiosClient.get("/Role");
    if (response) {
      return response;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
};

export default usePermission;
