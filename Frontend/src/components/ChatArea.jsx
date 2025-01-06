/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

const ChatArea = () => {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const selectedUser = selectedChat?.members.find(
    (member) => member._id !== user._id
  );

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
      {selectedChat && <div className="text-teal-700">{selectedChat._id}</div>}
    </div>
  );
};

export default ChatArea;
