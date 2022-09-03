import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    post: [],
    isLoading: false,
    error: null,
};
export const _getPost = createAsyncThunk(
    "post/getPost",
    async(payload, thunkApI) => {
        try {
            const data = await axios.get("http://localhost:3001/post");
            console.log(data)
            return thunkApI.fulfillWithValue(data.data);
        }catch(error){
            return thunkApI.rejectWithValue(error);
        }
    }
);

export const postSlice = createSlice({
  name:"post",
  initialState,
  reducers:{
    createPost(state,action){
        state.post.push(action.payload);
        axios.post("http://localhost:3001/post",action.payload)
        .then((response) => response.data);
    },
    likePost(state, action){
       let index = state.post.findIndex(post => post.id === action.payload.id);
       state.post[index].count +=1;
       axios.patch(`http://localhost:3001/post/${action.payload.id}`,action.payload)
    }
  },
  extraReducers: {
    [_getPost.pending] : (state) => {
        state.isLoading = true;
    },
    [_getPost.fulfilled] : (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
        console.log(state.post)
    },
    [_getPost.rejected] : (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(state.error)
    }
  }
});

export const {createPost,likePost} = postSlice.actions;
export default postSlice.reducer;