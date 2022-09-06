import styled from "styled-components";
import nextId from "react-id-generator";
import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {signUp} from '../redux/modules/users'
import axios from "axios";
const Sign = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialState = {
        nickname:"",
        password:"",
        passwordConfirm:"",
    }

    
    const [sign, setSign] = useState(initialState);

    const onChangeHander = (e) => {
        const {name, value} = e.target;
        setSign({...sign, [name]: value})
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
    // if( sign.nickname.trim() === ""|| sign.password.trim() === ""|| sign.passwordConfirm.trim() === ""){
    //     return alert ('모든 항목을 입력해주세요')
    // };   
    // if(sign.password !== sign.passwordConfirm){
    //     return alert('비밀번호 확인이 일치하지 않습니다.')};
    const data = await axios.post(
        "http://52.79.247.187:8080/api/member/signup",
        sign
    );
    console.log(data)
    if(data.success){
        navigate('/');
    }else{
        window.alert(data.error.message)
    }
   
}   
    return (
        <div>
            <StSigninContainer  onSubmit={onSubmitHandler}>
                 <h1>회원가입</h1>
                <StInputBox>
                    {/* <p>아이디</p>
                    <div>
                    <StInput type="text" placeholder='사용할 아이디를 입력해주세요'
                            name='username' value={sign.username} onChange={onChangeHander} 
                             />
                    <button>중복확인</button>
                    </div> */}
                </StInputBox>
                <StInputBox>
                    <p>닉네임</p>
                    <StInput type="text" placeholder='사용할 닉네임를 입력해주세요'
                            name='nickname' value={sign.nickname} onChange={onChangeHander} />
                </StInputBox>
                <StInputBox>
                    <p>비밀번호</p>
                    <StInput type="text" placeholder='소문자,숫자,특수문자를 포함한 8자 이상으로 입력해주세요'
                            name='password' value={sign.password} onChange={onChangeHander} />
                </StInputBox>
                <StInputBox>
                    <p>비밀번호 확인</p>
                    <StInput type="text" placeholder='소문자,숫자,특수문자를 포함한 8자 이상으로 입력해주세요'
                            name='passwordConfirm' value={sign.passwordConfirm} onChange={onChangeHander}/>
                </StInputBox>
                <StInputBox>
                </StInputBox>
                <StButton type="submit">회원가입</StButton>
            </StSigninContainer>
        </div >
    )
}

export default Sign

const StSigninContainer = styled.form`
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