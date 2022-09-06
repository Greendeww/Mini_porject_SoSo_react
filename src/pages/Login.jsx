import React from 'react'
import styled from 'styled-components'
import { Link, Outlet, useLocation } from "react-router-dom";
const Login = () => {
    const location = useLocation();
    return (
        <Back>
        <StLoginContainer>
            <h1>로그인</h1>
            <StInputBox>
                <p>아이디</p>
                <StInput type="text" />
            </StInputBox>
            <StInputBox>
                <p>비밀번호</p>
                <StInput type="text" />
            </StInputBox>
            <StInputBox>
                <p>아직 회원이 아니신가요?</p>
            </StInputBox>
            <StButton>로그인</StButton>
            <Link to="/detail" state={{ background: location }}>
                        here <Outlet />
                    </Link>
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
const StLoginContainer = styled.div`
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