import { IRepoInfo } from "@/services/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IRepoInfo = {
  id: NaN,
  name: "",
  url: "",
  stars: null,
};

const repoInfoSlice = createSlice({
  name: "repoInfo",
  initialState: initialState,
  reducers: {
    setRepoInfo: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setRepoInfo } = repoInfoSlice.actions;
export default repoInfoSlice.reducer;
