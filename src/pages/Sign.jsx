import React from 'react'
import styled from 'styled-components'
const Sign = () => {
    return (
        <div>
            <StSigninContainer>
                <h1>회원가입</h1>
                <StInputBox>
                    <p>아이디</p>
                    <div>
                    <StInput type="text" />
                    <button>중복확인</button>
                    </div>
                </StInputBox>
                <StInputBox>
                    <p>닉네임</p>
                    <StInput type="text" />
                </StInputBox>
                <StInputBox>
                    <p>비밀번호</p>
                    <StInput type="text" />
                </StInputBox>
                <StInputBox>
                    <p>비밀번호 확인</p>
                    <StInput type="text" />
                </StInputBox>
                <StInputBox>
                </StInputBox>
                <StButton>회원가입</StButton>
            </StSigninContainer>
        </div >
    )
}

export default Sign

const StSigninContainer = styled.div`
    width: 600px;
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
    width: 400px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
   ;
`
const StButton = styled.button`
    width: 400px;
    height: 50px;
    background-color: #3858e9;
    border: none;
    color: #fff;
    border-radius: 10px;
`