import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { deleteCookie, setCookie ,  getCookie} from "../../shared/cookie";
import { useNavigate } from "react-router-dom";

//로그인기능

export const __userLogin = createAsyncThunk(
    "user/userLogin",
    async (payload,thunkApI) => {
        try{
            const data = await axios.post(
                "http://54.180.31.216/api/member/login",
                payload
            )
                if(data.data.success === false){
                    console.log(data)
                    alert(data.data.error.message)
                }else{
                    setCookie("isLogin",data.headers.authorization);
                    setCookie("ACESS_TOKEN",data.headers.authorization,1)
                    setCookie("REFRESH_TOKEN",data.headers.refreshtoken)
                    localStorage.setItem("nickname",data.data.data.nickname);
                    window.location.replace("/");
                 }  
                 
                 return thunkApI.fulfillWithValue(data.data.username);         
        }catch(error){
            return thunkApI.rejectWithValue(error.message);
        }
    }
);
//중복체크(미구현)
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
//중복체크(미구현)
export const _postNickdCheck = createAsyncThunk(
    'users/NickCheck',
    async (nickname, thunkAPI) => {
        try{ const data = await axios.post('http://54.180.31.216/api/member/signup',
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
//로그아웃
export const _logout = createAsyncThunk(
    "users/logout",
    async (payload, thunkAPI) => {
        try{

            const data = await axios.delete("http://54.180.31.216/api/auth/member/logout",{

                headers:{
                         Authorization: getCookie("ACESS_TOKEN"),
                         RefreshToken: getCookie("REFRESH_TOKEN"),
                }
            })
            deleteCookie("ACESS_TOKEN")
            deleteCookie("REFRESH_TOKEN")
            deleteCookie("isLogin")
            return thunkAPI.fulfillWithValue(data.data)
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const users = createSlice({
    name:"users",
    initialState:{
        data:[],
        success:false,
        error: null,
        isLoading:false,
    },
    //로그아웃 리듀서에서 진행하기
    reducers:{
        logout(state,action) {
            deleteCookie("ACESS_TOKEN")
            deleteCookie("REFRESH_TOKEN")
            deleteCookie("isLogin")
            localStorage.clear()
            console.log("작동")
        }
    },

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

export let { userSignup,logout } = users.actions;

export default users;
