import styled from "styled-components";
import nextId from "react-id-generator";
import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {signUp,_postIdCheck} from '../redux/modules/users'
import axios from "axios";
const Sign = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setuserName] = useState('')
    const [nickname, setNickName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [nameMessage, setNameMessage] = useState('')
    const [nickMessage, setNickMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
  
  
     // 유효성 검사
     const [isName, setIsName] = useState(false)
     const [isNick, setIsNick] = useState(false)
     const [isPassword, setIsPassword] = useState(false)
     const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
   
     const onChangeName = (e) => {
        const usernameRegex = /^(?=.*[a-zA-z0-9])(?=.*[a-zA-z]).{4,12}$/
        const usernameCurrnet = e.target.value 
        setuserName(usernameCurrnet)
        
        if(!usernameRegex.test(usernameCurrnet)){
            setNameMessage('영문자랑 숫자만으로 구성해주세요')
            setIsName(false)
        }else{
            setNameMessage('올바른 형식입니다')
            setIsName(true)
        }
    };

    const onChangeNick = (e) => {
        const nickRegex = /^(?=.*[a-zA-z가-힣]).{3,8}$/
        const nickCurrent = e.target.value;
        setNickName(nickCurrent)

        if(!nickRegex.test(nickCurrent)){
            setNickMessage('닉네임은 2~8글자로 한글,영문자만 사용가능합니다')
            setIsNick(false)
        }else{
            setNickMessage('올바른 형식입니다')
            setIsNick(true)
        }
    }

    const onChangePassword = (e) => {
        const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9]).{8,32}$/
        const passwordCurrnet = e.target.value;
        setPassword(passwordCurrnet)

        if(!passwordRegex.test(passwordCurrnet)){
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
            setIsPassword(false);
        }else{
            setPasswordMessage('안전한 비밀번호에요!')
            setIsPassword(true);
        }
    }
    const onChangePasswordConform = (e) => {
        const passwordConformRegex = /^(?=.+[a-zA-z])(?=.+[0-9]).{8,32}$/
        const passwordConformCurrnet = e.target.value;
        setPasswordConfirm(passwordConformCurrnet)

        if(!passwordConformRegex.test(passwordConformCurrnet)){
            setPasswordConfirmMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
            setIsPasswordConfirm(false);
        }else{
            setPasswordConfirmMessage('안전한 비밀번호에요!')
            setIsPasswordConfirm(true);
        }
    }
    const userInfo = {
        username,
        nickname,
        password,
        passwordConfirm
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
    if( username.trim()===""|| nickname.trim() === ""|| password.trim() === ""|| passwordConfirm.trim() === ""){
        return alert ('모든 항목을 입력해주세요')
    };   
    if(password !== passwordConfirm){
        return alert('비밀번호 확인이 일치하지 않습니다.')};
    if(isName !== true || isNick !== true || isPassword !== true || isPasswordConfirm !== true ){
        return alert('형식을 확인해주세요')
    }
    const data = await axios.post(
        "http://54.180.31.216/api/member/signup",
        userInfo,{
            headers:{
                "Content-Type": "application/json",
            }
        }
    );
    console.log(data)
    if(data.data.success){
        navigate('/login');
    }else{
        window.alert(data.error.message)
    }

    
}   
    return (
        <div>
            <StSigninContainer  onSubmit={onSubmitHandler}>
                 <h1>회원가입</h1>
                <StInputBox>
                    <p>아이디</p>
                    <div>
                    <StInput type="text" placeholder='사용할 아이디를 입력해주세요'
                            name='username' value={username} onChange={onChangeName}
                             />
                    <button onClick={() => dispatch(_postIdCheck(username))}>중복확인</button>
                    {username.length > 0 && <p style={{color:'red'}}>{nameMessage}</p>}
                    </div>
                </StInputBox>
                <StInputBox>
                    <p>닉네임</p>
                    <StInput type="text" placeholder='사용할 닉네임를 입력해주세요'
                            name='nickname' value={nickname} onChange={onChangeNick} />
                    {nickname.length > 0 && <p style={{color:'red'}}>{nickMessage}</p>}
                </StInputBox>
                <StInputBox>
                    <p>비밀번호</p>
                    <StInput type="text" placeholder='소문자,숫자,특수문자를 포함한 8자 이상으로 입력해주세요'
                            name='password' value={password} onChange={onChangePassword} />
                    {password.length > 0 && <p style={{color:'red'}}>{passwordMessage}</p>}
                </StInputBox>
                <StInputBox>
                    <p>비밀번호 확인</p>
                    <StInput type="text" placeholder='소문자,숫자,특수문자를 포함한 8자 이상으로 입력해주세요'
                            name='passwordConfirm' value={passwordConfirm} onChange={onChangePasswordConform}/>
                    {passwordConfirm.length > 0 && <p style={{color:'red'}}>{/*{passwordConfirmMessage}*/}</p>}
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