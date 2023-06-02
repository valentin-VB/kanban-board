import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIssue, ISortedIssues } from "../services/interfaces";

const initialState: ISortedIssues = { open: [], closed: [], withAssignee: [] };

const sortedIssusSlice = createSlice({
  name: "issues",
  initialState: initialState,
  reducers: {
    setIssues: (state, action) => {
      state = action.payload;
      return state;
    },
    handleIssueDrop: (
      state,
      action: PayloadAction<{
        id: number;
        fromColumn: keyof ISortedIssues;
        type: keyof ISortedIssues;
      }>
    ) => {
      const { id, fromColumn, type } = action.payload;
      if (fromColumn === type) return;
      let targetItem;
      const removed = state[fromColumn].filter((issue: IIssue) => {
        if (issue.id === id) {
          targetItem = issue;
        }
        return issue.id !== id;
      });
      state[fromColumn] = removed;
      if (targetItem) state[type].unshift(targetItem);
    },
    handleDropHover: (
      state,
      action: PayloadAction<{
        draggedItemIndex: number;
        hoveredItemIndex: number;
        fromColumn: keyof ISortedIssues;
      }>
    ) => {
      const { draggedItemIndex, hoveredItemIndex, fromColumn } = action.payload;
      const tmp = state[fromColumn][draggedItemIndex];
      state[fromColumn][draggedItemIndex] = state[fromColumn][hoveredItemIndex];
      state[fromColumn][hoveredItemIndex] = tmp;
    },
  },
});

export const { setIssues, handleIssueDrop, handleDropHover } =
  sortedIssusSlice.actions;
export default sortedIssusSlice.reducer;
