import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeedFeed: (state, action) => {
      const newState = state.filter(
        (request) => request._id !== action.payload,
      );
      return newState;
    },
  },
});

export const { addFeed, removeUserFromFeedFeed } = feedSlice.actions;

export default feedSlice.reducer;
