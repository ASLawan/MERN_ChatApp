/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createChat } from "../apiCalls/chats";
import { setUserChats, setSelectedChat } from "../redux/userSlice";

const UserList = ({ searchkey }) => {
  // dynamic styling
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { users, userChats, user, selectedChat } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  //   handle Chat Creation
  const handleCreateChat = async (searchedUserId) => {
    let response = null;

    try {
      response = await createChat([searchedUserId, user._id]);
      if (response.success) {
        const newChat = response.data;
        const updatedChats = [...userChats, newChat];
        dispatch(setUserChats(updatedChats));
        dispatch(setSelectedChat(newChat));
      }
    } catch (error) {
      toast.error(response.message);
    }
  };

  // handle Open Chat
  const handleOpenChat = (selectedUserId) => {
    const chat = userChats.find(
      (chat) =>
        chat.members.map((member) => member._id).includes(selectedUserId) &&
        chat.members.map((member) => member._id).includes(user._id)
    );

    if (chat) {
      dispatch(setSelectedChat(chat));
      setSelectedUserId(selectedUserId); // Track the selected user
    }
  };

  // handle is selected
  const isSelected = (userId) => {
    return (
      selectedUserId === userId ||
      (selectedChat &&
        selectedChat.members.some((member) => member._id === userId))
    );
  };

  // handle last message
  const getLastMessage = (user) => {
    const chat = userChats.find((chat) =>
      chat.members.some((member) => member._id.includes(user._id))
    );

    if (!chat.lastmessage) {
      return user.email;
    } else {
      const msgSender = chat.lastmessage.sender === user._id;
      //   console.log(chat?.lastmessage?.text);
      return `${msgSender ? "You:" : ""} ${
        chat?.lastmessage?.text.slice(0, 10) + "..."
      }`;
    }
  };

  return (
    <div>
      {users
        .filter((user) => {
          return (
            (searchkey &&
              (user.firstname.toLowerCase().includes(searchkey.toLowerCase()) ||
                user.lastname
                  .toLowerCase()
                  .includes(searchkey.toLowerCase()))) ||
            userChats.some((chat) =>
              chat.members.map((member) => member._id).includes(user._id)
            )
          );
        })
        .map((user) => {
          const isUserSelected = isSelected(user._id);
          return (
            <div key={user._id} onClick={() => handleOpenChat(user._id)}>
              <div className={isUserSelected ? "selected" : "notSelected"}>
                {user?.profilepic ? (
                  <div className="flex justify-center items-center w-[60px] h-[60px] text-white font-bold rounded-full text-[25px]">
                    <img src="" alt="profile pic" />
                  </div>
                ) : (
                  <div
                    className={`flex justify-center items-center w-[60px] h-[60px] ${
                      isUserSelected
                        ? "selectedInitials"
                        : "notSelectedInitials"
                    } font-bold rounded-full text-[25px]`}
                  >
                    {user.firstname.toUpperCase()[0] +
                      user.lastname.toUpperCase()[0]}
                  </div>
                )}

                <div className=" justify-center gap-2 items-center hidden w-fit lg:flex md:flex-col">
                  <div
                    className={`${
                      isUserSelected
                        ? "selectedNameEmail"
                        : "notSelectedNameEmail"
                    } font-semibold`}
                  >
                    {user.firstname}
                  </div>
                  <div
                    className={`${
                      isUserSelected
                        ? "selectedNameEmail"
                        : "notSelectedNameEmail"
                    } font-semibold`}
                  >
                    {getLastMessage(user)}
                  </div>
                </div>
                <div className="flex flex-col justify-around items-center">
                  {!userChats.find((chat) =>
                    chat.members.map((member) => member._id).includes(user._id)
                  ) && (
                    <button
                      className="px-2 py-1 bg-teal-700 text-white font-semibold hover:bg-white hover:text-teal-700 hover:font-bold text-[14px] rounded-[10px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreateChat(user._id);
                      }}
                    >
                      Start Chat
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;
