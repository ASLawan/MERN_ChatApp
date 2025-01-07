import { axiosInstance } from ".";

const baseUrl = "/api/msg";

export const createMsg = async (message) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/new-msg`, message);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserMsgs = async (chatID) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/user-msgs/${chatID}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
