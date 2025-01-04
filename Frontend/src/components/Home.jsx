/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center p-8 w-full mt-0">
        <div>
          <h1 className="text-white text-[54px] font-bold">Home</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
