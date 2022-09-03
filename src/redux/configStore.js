import { configureStore } from "@reduxjs/toolkit";
import post from "../redux/modules/post"
// import contents from "../redux/modules/contents"

const store = configureStore({
  reducer: {

     post : post,
    
  }
});

export default store;


