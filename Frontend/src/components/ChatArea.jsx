/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import moment from "moment";
import { createMsg, getUserMsgs } from "../apiCalls/msg";
import { RiSendPlaneFill } from "@remixicon/react";

const ChatArea = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

  // handle Get User Messages
  const handleGetUserMessages = async () => {
    try {
      const response = await getUserMsgs(selectedChat._id);

      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // handle time format
  const handleTimeFormat = (timeStamp) => {
    const now = moment();
    const diff = now.diff(moment(timeStamp), "days");

    if (diff < 1) {
      return `Today ${moment(timeStamp).format("hh:mm A")}`;
    } else if (diff === 1) {
      return `Yesterday ${moment(timeStamp).format("hh:mm A")}`;
    } else {
      return moment(timeStamp).format("MMM D, hh:mm A");
    }
  };

  // useEffect
  useEffect(() => {
    handleGetUserMessages();
  }, [selectedChat]);

  return (
    <div className="bg-white w-full flex flex-col rounded-[10px] border-2 border-teal-700">
      <div className="border-b-4 border-teal-700 w-full flex justify-start px-[50px] pt-[20px]">
        <p className="text-teal-700 font-semibold text-[20px]">
          {selectedUser?.firstname.charAt(0).toUpperCase() +
            selectedUser?.firstname.slice(1).toLowerCase()}{" "}
          {selectedUser?.lastname.charAt(0).toUpperCase() +
            selectedUser?.lastname.slice(1).toLowerCase()}
        </p>
      </div>
      {/* {selectedChat && <div className="text-teal-700">{selectedChat._id}</div>} */}
      <div className="p-4  w-full h-[50vh] overflow-y-auto custom-scrollbar">
        {/* <h1 className="text-teal-700 font-bold text-[44px] ">Chat Area</h1> */}
        {messages.map((message) => {
          const isMessageSender = message.sender === user._id;
          return (
            <div
              key={message._id}
              className={`text-black font-serif p-2 w-full rounded flex flex-col ${
                isMessageSender ? "send " : "receive"
              }`}
            >
              <div className={`p-2 max-w-max mb-[-20px]`}>
                <div
                  className={`px-2 py-1 ${
                    isMessageSender
                      ? "ml-2 bg-teal-200 rounded-t-[28px] rounded-bl-[28px]"
                      : "mr-2 bg-teal-100 rounded-t-[28px] rounded-br-[28px]"
                  } mb-0`}
                >
                  {message.text}
                </div>
                <span
                  className={`p-0 m-0 text-[12px] text-gray-400 ${
                    isMessageSender ? "flex justify-end" : "flex justify-start"
                  }`}
                >
                  {handleTimeFormat(message.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full px-4 py-1 gap-4 items-center mb-4">
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
          <RiSendPlaneFill />
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
