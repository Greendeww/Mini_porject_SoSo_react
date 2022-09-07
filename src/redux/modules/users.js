import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../../shared/cookie";

export const __userLogin = createAsyncThunk(
    "user/userLogin",
    async ({payload,navigate},thunkApI) => {
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
                navigate('/')
                console.log(data)
                return thunkApI.fulfillWithValue(data.data.username);
            }
            localStorage.setItem("username",data.username);
        }catch(error){
            return thunkApI.rejectWithValue(error.message);
        }
    }
);
export const _postIdCheck = createAsyncThunk(
    'users/idCheck',
    async (username, thunkAPI) => {
        try{ const data = await axios.post('url',
            username,{
                headers: {'Content-Type': `application/json`},
            })
            .then((response) => {
                console.log(response);
                if(response.data === true){
                    window.alert('사용할 수 있는 아이디입니다.')
                }else{
                    window.alert('이미 존재하는 아이디입니다.')
                }
            });
         return thunkAPI.fulfillWithValue(data.data);
        }catch(error){
         return thunkAPI.rejectWithValue(error);   
        }
    }
)
export const _postNickdCheck = createAsyncThunk(
    'users/NickCheck',
    async (nickname, thunkAPI) => {
        try{ const data = await axios.post('http://13.209.97.75:8080/api/member/signup',
            nickname,{
                headers: {'Content-Type': `application/json`},
            })
            .then((response) => {
                console.log(response);
                if(response.data === true){
                    window.alert('사용할 수 있는 닉네임입니다.')
                }else{
                    window.alert('이미 존재하는 닉네임입니다.')
                }
            });
         return thunkAPI.fulfillWithValue(data.data);
        }catch(error){
         return thunkAPI.rejectWithValue(error);   
        }
    }
)
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
