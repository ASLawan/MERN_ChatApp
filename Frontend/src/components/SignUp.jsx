/* eslint-disable no-unused-vars */
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "../apiCalls/auth.js";

const SignUp = () => {
  // get form data
  let [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  // handle Change
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userData);
    let response = null;
    try {
      response = await signUpUser(userData);
      if (response.success) {
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(response.message);
    }
    setUserData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="flex flex-col p-8 m-4 w-full h-full">
      <div className="m-4 p-6 flex justify-center items-center">
        <h1 className="text-white font-bold text-[40px]">Create Account</h1>
      </div>
      <div className="flex p-4 justify-center bg-white w-[400px] mx-auto rounded-[16px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mt-2 mb-2 w-[350px]"
        >
          <input
            type="text"
            name="firstname"
            id="fname"
            value={userData.firstname}
            placeholder="First name..."
            onChange={handleChange}
            className="outline-none border-b-4 border-b-teal-600 rounded text-black h-[40px] pl-[10px]"
          />

          <input
            type="text"
            name="lastname"
            id="lname"
            value={userData.lastname}
            placeholder="Last name..."
            onChange={handleChange}
            className="outline-none border-b-4 border-b-teal-600 rounded text-black h-[40px] pl-[10px]"
          />

          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            placeholder="Email..."
            onChange={handleChange}
            className="outline-none border-b-4 border-b-teal-600 rounded text-black h-[40px] pl-[10px]"
          />

          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            placeholder="Password..."
            onChange={handleChange}
            className="outline-none border-b-4 border-b-teal-600 rounded text-black h-[40px] pl-[10px]"
          />

          <button
            type="submit"
            className="px-2 py-1 bg-teal-600 my-2 text-white font-semibold rounded cursor-pointer hover:bg-white hover:text-teal-600 transition-all duration-200"
          >
            Sign up
          </button>
          <div>
            <p className="text-[16px] font-semibold">
              Already have an account ?{" "}
              <span className="text-teal-600 underline cursor-pointer ml-4">
                <Link to={"/login"}>Login here!</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
