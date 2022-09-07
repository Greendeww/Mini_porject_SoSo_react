import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../../shared/cookie";

export const __userLogin = createAsyncThunk(
    "user/userLogin",
    async (payload,thunkApI) => {
        try{
            const data = await axios.post(
                "http://13.209.97.75:8080/api/member/login",
                payload
            );
            if(data.success) {
                console.log(data)
                setCookie("isLogin",data.token);
                setCookie("ACESS_TOKEN",1)
                setCookie("REFRESH_TOKEN","콘솔보고 찍어보기")
                return thunkApI.fulfillWithValue(data.data.username);
            }
            localStorage.setItem("username",data.username);
        }catch(error){
            return thunkApI.rejectWithValue(error.message);
        }
    }
);

//요청 보낼 때 어썰라이즌이랑 리프래시 둘라 보내기
const userToken = localStorage.getItem("Authorization")
    ? localStorage.getItem("Authorization")
    : null;

//로그아웃 기능(미완성)
export const userSlice = createSlice({
    name:"userLogout",
    initialState:{
        isLoading: false,
        userInfo: null,
        userToken,
        error: null,
        success: false,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("Authorization");
            localStorage.removeItem("RefreshToken");
            localStorage.removeItem("userInfo");
            state.isLoading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
        }
    }
})


//로그인 기능
export const users = createSlice({
    name:"users",
    initialState:{
        data:[],
        success:false,
        error: null,
        isLoading:false,
    },

    reducers:{},

    extraReducers: {
       [__userLogin.pending]: (state) => {
        state.isLoading = true;
       },
       [__userLogin.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.users = action.payload;       
       },
       [__userLogin.rejected]: (state, action) => {
        state.isLoading = false;
        state.error =action.payload;
       }
    }
})

export let { userSignup } = users.actions;

export default users;
