import styled from "styled-components";
import nextId from "react-id-generator";
import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {__userLogin} from '../redux/modules/users'
import { getCookie } from "../shared/cookie";
const Login = () => {   

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialstate = {
        username:"",
        password:"",
    }
    const [user,setUser] = useState(initialstate);
        // console(user)
    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    };

    return (
        <Back>
        <StLoginContainer  >
            <h1>로그인</h1>
            <StInputBox>
                <p>아이디</p>
                <StInput type="text" placeholder='사용할 아이디를 입력해주세요'
                            name='username' value={user.username} onChange={onChangeHandler}/>
            </StInputBox>
            <StInputBox>
                <p>비밀번호</p>
                <StInput type="password" placeholder='사용할 아이디를 입력해주세요'
                            name='password' value={user.password} onChange={onChangeHandler} />
            </StInputBox>
            <StInputBox>
                <Signup onClick={() => navigate('/signin')}>아직 회원이 아니신가요?</Signup>
            </StInputBox>
            <StButton type='button' onClick={() => {
                if (user.username.trim() === "" || user.password.trim() === "")
                return alert("아이디와 비밀번호를 입력하세요.");
                dispatch(__userLogin(user));
                navigate('/')
            }}>로그인</StButton>
        </StLoginContainer>
        </Back>
    )
}

export default Login
const Back = styled.div`
    background-color: #000;
    width: 100%;
    height: 100vh;
`
const StLoginContainer = styled.form`
    width: 300px;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: auto;
   
`
const StInputBox = styled.div`
    padding: 10px 0px;
`
const StInput = styled.input`
    width: 280px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
   ;
`
const StButton = styled.button`
    width: 280px;
    height: 50px;
    background-color: #3858e9;
    border: none;
    color: #fff;
    border-radius: 10px;
`
const Signup = styled.p`
    &:hover{
   color: blue; 
   cursor: pointer;
   }
`