/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center xl:justify-around xl:flex-row p-8 w-full mt-0">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 flex justify-center">
          <h1 className="text-white text-[54px] font-bold">Home</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
