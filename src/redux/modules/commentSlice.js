import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const accessToken = localStorage.getItem("Authorization")
  ? localStorage.getItem("Authorization")
  : null;
const refreshToken = localStorage.getItem("RefreshToken");

let config = {
  headers: {
    Authorization: accessToken,
    RefreshToken: refreshToken,
  },
};



// 전체댓글 조회
export const __getCommnetsByPostId = createAsyncThunk(
  "GET_COMMENT_BY_TODO_ID",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `url/api/auth/comment/${arg}`  
        // arg 포스트 아이디
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 댓글추가
export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `http://13.209.97.75:8080/api/auth/comment/{id}`,
        arg,
        // arg = comment:comment
        config
        // config = 토큰
      );
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 댓글삭제
export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(`http://13.209.97.75:8080/api/auth/comments/${arg}`, config);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 댓글수정
export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const res = await axios.put(
        `http://13.209.97.75:8080/api/auth/comments/${arg.id}`,
        arg,
        config
      );
      console.log(res.data.data);
      return thunkAPI.fulfillWithValue(res.data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const commentSlice = createSlice({
  name: "comment",
  initialState:{
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addComment: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers:  (builder) => {
    builder
        .addCase(__deleteComment.pending, (state) => {
            state.isLoading = true;
            console.log("펜딩")
        })
        .addCase(__deleteComment.fulfilled, (state, action) => {
            state.isLoading = false;
            let index = state.findIndex(
              (comment) => comment.id === action.payload
            );
            state.splice(index, 1);
            state.isDelete = true;
            console.log(state)
        })
        .addCase(__deleteComment.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log("에러")
        });
    builder
        .addCase(__getCommnetsByPostId.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(__getCommnetsByPostId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.post = action.payload;
            console.log(state.post)
        })
        .addCase(__getCommnetsByPostId.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
       
        });
    builder
        .addCase(__updateComment.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(__updateComment.fulfilled, (state, action) => {
            state.isLoading = false;
            let index = state.findIndex((comment) => comment.id === action.payload.id);
            state.splice(index, 1, action.payload);
            console.log(state.post)
        })
        .addCase(__updateComment.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
       
        });

   
  }
});

export const { addComment, deleteComment, updateComment } = commentSlice.actions;
export default commentSlice;
