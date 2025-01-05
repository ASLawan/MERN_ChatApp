/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Search from "./Search";
import UserList from "./UserList";

const Sidebar = () => {
  let [searchkey, setSearchKey] = useState("");
  return (
    <>
      <div className="flex flex-col justify-center p-4">
        <Search searchkey={searchkey} setSearchKey={setSearchKey} />
      </div>
      <UserList searchkey={searchkey} />
    </>
  );
};

export default Sidebar;
