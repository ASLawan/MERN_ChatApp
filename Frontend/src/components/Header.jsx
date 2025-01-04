/* eslint-disable no-unused-vars */
import React from "react";
import { RiChat1Line } from "@remixicon/react";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.userReducer);
  console.log(user);
  //get user name
  const getUserName = () => {
    let name =
      user?.firstname.charAt(0).toUpperCase() + user?.firstname.slice(1);
    return name;
  };

  //get user initials
  const getUserInitials = () => {
    let first = user?.firstname.toUpperCase()[0];
    let last = user?.lastname.toUpperCase()[0];
    let initials = `${first}${last}`;
    return initials;
  };

  return (
    <div className="flex flex-col xl:flex-row justify-around w-full h-[100px] items-center bg-teal-600 shadow-white shadow-md">
      <div className="text-white text-[44px] font-bold flex items-center">
        <RiChat1Line className="mr-4 text-[30px]" size={40} />
        Quick Chat
      </div>
      <div className="flex justify-center gap-[20px]">
        <div className="text-white text-[25px] font-semibold flex justify-center items-center">
          {getUserName()}
        </div>
        <div className="text-teal-600 text-[30px] font-bold w-[80px] h-[80px] bg-white rounded-full flex justify-center items-center ">
          {getUserInitials()}
        </div>
      </div>
    </div>
  );
};

export default Header;
