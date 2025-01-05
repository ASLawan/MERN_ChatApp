/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { RiUser2Fill } from "@remixicon/react";
import { RiSearch2Line } from "@remixicon/react";

const Search = ({ searchkey, setSearchKey }) => {
  const handleChange = (e) => {
    setSearchKey(e.target.value);
    // console.log("From input: ", e.target.value);
    // console.log("From searchkey: ", searchkey);
  };
  return (
    <div className="flex justify-center gap-3 items-center">
      <input
        type="search"
        name="search"
        id="search"
        value={searchkey}
        placeholder="search user"
        className="outline-teal-600 text-black rounded-full w-full h-7 px-3 py-1"
        onChange={(e) => handleChange(e)}
      />
      <RiSearch2Line color="white" size={25} />
    </div>
  );
};

export default Search;
