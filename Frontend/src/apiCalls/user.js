import { axiosInstance } from ".";

const baseUrl = "/api/user";

export const getUser = async () => {
  try {
    const restponse = await axiosInstance.get(`${baseUrl}/get-user`);

    return restponse.data;
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    let response = await axiosInstance.get(`${baseUrl}/get-users`);
    return response.data;
  } catch (error) {
    return error;
  }
};
