/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createMsg } from "../apiCalls/msg";

const ChatArea = () => {
  const [message, setMessage] = useState("");
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const selectedUser = selectedChat?.members.find(
    (member) => member._id !== user._id
  );

  // handle Create Message
  const handleCreateMessage = async (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    try {
      const newMessage = {
        chatId: selectedChat._id,
        sender: user._id,
        text: message,
      };

      const response = await createMsg(newMessage);
      if (response.success) {
        toast.success(response.message);
        setMessage("");
      }
      return response;
    } catch (error) {
      toast.error(error.message);
      setMessage("");
    }
  };

  return (
    <div className="bg-white w-full flex flex-col rounded-[10px] border-2 border-teal-700">
      <div className="border-b-4 border-teal-700 w-full flex justify-end px-[50px] pt-[20px]">
        <p className="text-teal-700 font-semibold text-[20px]">
          {selectedUser?.firstname.charAt(0).toUpperCase() +
            selectedUser?.firstname.slice(1).toLowerCase()}{" "}
          {selectedUser?.lastname.charAt(0).toUpperCase() +
            selectedUser?.lastname.slice(1).toLowerCase()}
        </p>
      </div>
      {/* {selectedChat && <div className="text-teal-700">{selectedChat._id}</div>} */}
      <div className="p-4 flex flex-col w-full">
        <h1 className="text-teal-700 font-bold text-[44px] h-[50vh]">
          Chat Area
        </h1>
      </div>
      <div className="flex w-full px-4 py-1 gap-4 items-center">
        <input
          type="text"
          name="message"
          id="message"
          value={message}
          placeholder="Message...."
          className="border-2 border-teal-500 flex-1 px-3 py-1 rounded outline-none "
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          className="px-6 py-1 bg-teal-700 text-white rounded font-semibold hover:bg-white hover:text-teal-700 hover:border-2 hover:border-teal-700"
          onClick={handleCreateMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
