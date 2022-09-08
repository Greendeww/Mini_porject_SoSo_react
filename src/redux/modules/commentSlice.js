import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { getCookie } from "../../shared/cookie";

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
        `http://54.180.31.216/api/auth/comment/${arg}`
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
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `http://54.180.31.216/api/auth/comment/${payload.id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getCookie("ACESS_TOKEN"),
            RefreshToken: getCookie("REFRESH_TOKEN"),
          }
        }
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
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://54.180.31.216/api/auth/comment/${payload.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getCookie("ACESS_TOKEN"),
            RefreshToken: getCookie("REFRESH_TOKEN"),
          }
        });
      return thunkAPI.fulfillWithValue(payload);
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
        `http://54.180.31.216/api/auth/comment/${arg.id}`,
        { comment: arg.comment,
          postId:arg.postId,
          nickname:arg.nickname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getCookie("ACESS_TOKEN"),
            RefreshToken: getCookie("REFRESH_TOKEN"),
          }
        }
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
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
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

  extraReducers: (builder) => {

    builder
      .addCase(__getCommnetsByPostId.pending, (state) => {
        state.isLoading = true;
        console.log("펜딩")
      })
      .addCase(__getCommnetsByPostId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
        console.log("작동")

      })
      .addCase(__getCommnetsByPostId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("에러")

      });
  }
});

export const { addComment, deleteComment, updateComment } = commentSlice.actions;
export default commentSlice;
