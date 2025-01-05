/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

const UserList = ({ searchkey }) => {
  const { users, userChats } = useSelector((state) => state.userReducer);
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
            userChats.some((chat) => chat.members.includes(user._id))
          );
        })
        .map((user) => {
          return (
            <div
              className="flex flex-row justify-around bg-white p-4 rounded border-2 border-teal-700 mb-1"
              key={user._id}
            >
              {user.profilepic ? (
                <div className="flex justify-center items-center w-[60px] h-[60px] text-white font-bold rounded-full text-[25px]">
                  <img src="" alt="profile pic" />
                </div>
              ) : (
                <div className="flex justify-center items-center w-[60px] h-[60px] bg-teal-700 text-white font-bold rounded-full text-[25px]">
                  {user.firstname.toUpperCase()[0] +
                    user.lastname.toUpperCase()[0]}
                </div>
              )}
              {/* <div className="flex justify-center items-center w-[60px] h-[60px] bg-teal-700 text-white font-bold rounded-full text-[25px]">
                {user.firstname.toUpperCase()[0] +
                  user.lastname.toUpperCase()[0]}
              </div> */}
              <div className="flex flex-col justify-center gap-2 items-center">
                <div className="text-teal-700 font-semibold">
                  {user.firstname}
                </div>
                <div className="text-teal-700 font-semibold">{user.email}</div>
              </div>
              <div className="flex flex-col justify-around items-center">
                {!userChats.find((chat) => chat.members.includes(user._id)) && (
                  <button className="px-2 py-1 bg-teal-700 text-white font-semibold hover:bg-white hover:text-teal-700 hover:font-bold text-[14px] rounded-[10px]">
                    Start Chat
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;
