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
        `url/api/auth/comment/{id}`,
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

export const commentSlice = createSlice({
  name: "comment",
  initialState:[{
    id:"ds",
    postId:0,
    comments:""
  }],
  reducers: {
    addComment: (state, action) => {
      state.push(action.payload);
    },
    deleteComment: (state, action) => {
      let index = state.findIndex(
        (comment) => comment.id === action.payload
      );
      state.splice(index, 1);
    },
    updateComment: (state, action) => {
      let index = state.findIndex((comment) => comment.id === action.payload.id);
      state.splice(index, 1, action.payload);
    },
  },
});

export const { addComment, deleteComment, updateComment } = commentSlice.actions;
export default commentSlice;
