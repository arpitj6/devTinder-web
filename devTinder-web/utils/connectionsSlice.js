import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConections: (state, action) => action.payload,
    removeConnections: (state, action) => null,
  },
});

export const { addConections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
