import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    userChats: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setUserChats: (state, action) => {
      state.userChats = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setUsers, setUserChats } = userSlice.actions;
