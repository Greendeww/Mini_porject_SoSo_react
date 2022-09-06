import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./modules/postSlice"

import commentSlice from "./modules/commentSlice";

const store = configureStore({
  reducer: {
   
    commentSlice: commentSlice.reducer,
    postSlice: postSlice.reducer
  }
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import todos from "../modules/todo";

// const store = configureStore({
//   reducer: {
//     todos: todos.reducer,
//   },
// });

// export default store;
