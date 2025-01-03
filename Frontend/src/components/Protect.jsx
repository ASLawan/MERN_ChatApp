/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../apiCalls/user";
import { useNavigate } from "react-router-dom";

const Protect = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const getLoggedInUser = async () => {
    let response = null;

    try {
      response = await getUser();

      if (response.success) {
        setUser(response.data);
      } else {
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
    } else {
      navigate("/login");
    }
  });
  return (
    <>
      <p className="text-white">Hello, {user?.firstname}</p>
      <div>{children}</div>
    </>
  );
};

export default Protect;
