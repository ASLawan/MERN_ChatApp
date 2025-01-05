import { axiosInstance } from ".";

const baseUrl = "/api/chat";
export const getUserChats = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/user-chats`);

    return response.data;
  } catch (error) {
    return error;
  }
};
