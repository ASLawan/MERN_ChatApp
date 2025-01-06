/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import { useSelector } from "react-redux";

const Home = () => {
  const { selectedChat } = useSelector((state) => state.userReducer);
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center gap-4 xl:justify-center xl:flex-row p-8 w-full mt-0">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 flex justify-center">
          {selectedChat && <ChatArea />}
        </div>
      </div>
    </>
  );
};

export default Home;
