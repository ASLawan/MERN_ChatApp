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

export const createChat = async (members) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/new-chat`, {
      members,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
