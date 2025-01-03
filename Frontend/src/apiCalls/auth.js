import { axiosInstance } from ".";

const baseUrl = "/api/auth";

export const signUpUser = async (user) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/signup`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/login`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};
