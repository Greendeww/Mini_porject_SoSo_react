import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    post: [],
    isLoading: false,
    error: null,
    like: false,
};
export const _getPost = createAsyncThunk(
    "post/getPost",
    async(payload, thunkApI) => {
        try {
            const data = await axios.get("http://54.180.31.216/api/auth/post");
           
            // console.log(data)
            return thunkApI.fulfillWithValue(data.data);
        }catch(error){
            return thunkApI.rejectWithValue(error);
        }
    }
);



export const _updatePost = createAsyncThunk(
    "post/upDate",
    async (payload, thunkApI) => {
        console.log(payload)
        try {
            const data = await axios.patch(
                `http://54.180.31.216/api/auth/post/${payload.id}`,

                payload.data,{
                    headers:{
                        "Content-Type": "multipart/form",
                        Authorization: payload.token,
                        RefreshToken: payload.refresh
                    }
                    
                }
            )
            return thunkApI.fulfillWithValue(data.data);
            console.log(data)
        }catch(error){
            return thunkApI.rejectWithValue(error);
        }
    }
)
export const _deletePost = createAsyncThunk(
    "post/deDate",
    async (payload, thunkAPI) => {
        console.log(payload)
        try{
            const data = await axios.delete(

                `http://54.180.31.216/api/auth/post/${payload.id}`

                ,
                payload.id,{
                    headers:{
                        Authorization: payload.token,
                        RefreshToken: payload.refresh

                    }
                }
            )
            console.log(data)
            return data
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const _getLike = createAsyncThunk(
    "post/getPost",
    async(payload, thunkApI) => {
        try {
            const data = await axios.get("http://13.209.97.75:8080/api/auth/like/{id}");
           
            // console.log(data)
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
        axios.post("http://54.180.31.216/api/auth/post/api/auth/post",action.payload)
        .then((response) => response.data);
    },
    likePost(state, action){
       let index = state.post.findIndex(post => post.id === action.payload.id);
       state.post[index].count +=1;
       axios.patch(`http://54.180.31.216/api/auth/post/post/${action.payload.id}`,action.payload)
    },
    hatePost(state, action){
        let index = state.post.findIndex(post => post.id === action.payload.id);
        state.post[index].count -=1;
        axios.patch(`http://54.180.31.216/api/auth/post/post/${action.payload.id}`,action.payload)
    },
    deletePost(state,action){
        console.log(state)
        let index = state.post.findIndex(post => post.id === action.payload)
        state.post.slice(index,1)
        console.log(state)
        axios.delete(`http://54.180.31.216/api/auth/post/api/auth/post/${action.payload}`, action.payload)
    },
    updatePost(state,action){
        let index = state.post.findIndex(post => post.id === action.payload.id);
        state.post.slice(index,1,action.payload)
        axios.patch(`http://54.180.31.216/api/auth/post/api/auth/post/${action.payload.id}`,action.payload)
    }
  },
  extraReducers:  (builder) => {
    builder
        .addCase(_deletePost.pending, (state) => {
            state.isLoading = true;
            console.log("펜딩")
        })
        .addCase(_deletePost.fulfilled, (state, action) => {
            state.isLoading = false;
            const deleteState = state.post.findIndex(post => post.id === action.payload)
            state.post.slice(deleteState,1)
            state.isDelete = true;
            console.log(state)
        })
        .addCase(_deletePost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log("에러")
        });
    builder
        .addCase(_getPost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(_getPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.post = action.payload.data;
            console.log(state.post)
        })
        .addCase(_getPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
       
        });
    builder
        .addCase(_updatePost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(_updatePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.post = action.payload;
            console.log(state.post)
        })
        .addCase(_updatePost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
       
        });

   
  }
});

export const {createPost,likePost,deletePost,updatePost,hatePost} = postSlice.actions;
export default postSlice