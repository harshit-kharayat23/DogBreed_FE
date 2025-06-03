import { createSlice } from "@reduxjs/toolkit";

const dogSlice = createSlice({
  name: "dog",
  initialState: {
    dogName: "",
    dogBreed: "",
    dogGender: "",
    dogAge: "",
  },
  reducers: {
    addDogInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addDogInfo } = dogSlice.actions;
export default dogSlice.reducer;
