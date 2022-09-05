import { configureStore } from "@reduxjs/toolkit";
import post from "../redux/modules/post"

import commentSlice from "./modules/commentSlice";

const store = configureStore({
  reducer: {
   
    commentSlice: commentSlice.reducer,
    post : post.reducer
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
