import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    title: "Hello World",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum accusantium ratione saepe ad, possimus impedit sapiente accusamus cum modi eum?",
    imageId: "12345678",
    status: false,
    userId: "chetan",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
