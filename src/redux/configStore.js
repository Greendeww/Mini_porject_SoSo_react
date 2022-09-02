import { configureStore } from "@reduxjs/toolkit";
import post from "../redux/modules/post"
// import contents from "../redux/modules/contents"

const store = configureStore({
  reducer: {
    //  contents:contents.reducer,
     post : post,
    
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
