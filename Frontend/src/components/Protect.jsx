/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import { getUser, getUsers } from "../apiCalls/user";
import { getUserChats } from "../apiCalls/chats";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setUsers, setUserChats } from "../redux/userSlice";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import { toast } from "react-hot-toast";

const Protect = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  const { user } = useSelector((state) => state.userReducer);

  const getLoggedInUser = async () => {
    let response = null;

    try {
      // dispatch(showLoader());
      response = await getUser();
      // dispatch(hideLoader());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      // dispatch(hideLoader());
      navigate("/login");
    }
  };
  const getNonLoggedInUsers = async () => {
    let response = null;

    try {
      // dispatch(showLoader());
      response = await getUsers();
      // dispatch(hideLoader());
      if (response.success) {
        dispatch(setUsers(response.data));
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      // dispatch(hideLoader());
      navigate("/login");
    }
  };
  const getLoggedInUserChats = async () => {
    let response = null;
    try {
      response = await getUserChats();
      if (response.success) {
        dispatch(setUserChats(response.data));
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //   console.log("Token found!");
      getLoggedInUser();
      getNonLoggedInUsers();
      getLoggedInUserChats();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {/* <p className="text-white">Hello, {user?.firstname}</p> */}
      <div>{children}</div>
    </>
  );
};

export default Protect;
