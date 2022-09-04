import { configureStore } from "@reduxjs/toolkit";

import contents from "../redux/modules/contents"
import commentSlice from "./modules/commentSlice";

const store = configureStore({
  reducer: {
    contents:contents.reducer,
    commentSlice: commentSlice.reducer
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
