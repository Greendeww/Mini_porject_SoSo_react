import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./modules/postSlice"
import users from "./modules/users";
import commentSlice from "./modules/commentSlice";

const store = configureStore({
  reducer: {
    users: users.reducer,
    commentSlice: commentSlice.reducer,
    postSlice: postSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ 
              serializableCheck: false, }),
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
