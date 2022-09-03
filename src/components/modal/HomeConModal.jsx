import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
const HomeConModal = ({onClose}) => {
    const navigate = useNavigate();
    return (
        <StModal >
            <StModalBox>
                <div>
                    <StTitButton >
                        <h1>상세페이지</h1>
                        <div>
                        <StButton>수정하기</StButton>
                        <StButton onClick={() => {navigate("/")}}>이전으로</StButton>
                        </div>
                    </StTitButton>
                    <StImgBox>
                        <img src="https://i.pinimg.com/564x/d9/c8/25/d9c8256448c3b7c1f8dc190264b1283c.jpg" alt="" />
                    </StImgBox>
                    <StTitName>
                        <h1>제목/닉네임</h1>
                        <p>❤️ 1</p>
                    </StTitName>
                </div>
                <div>
                    <StCommentBox>
                        <input type="text" />
                        <button>댓글달기</button>
                    </StCommentBox>
                    <div>
                        <p>테스트 텍스트 입니다.</p>
                    </div>
                </div>
            </StModalBox>
        </StModal>
    )
}

export default HomeConModal
const StModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  overflow-y: scroll;  
`
const StModalBox = styled.div`
  width: 90%;
  max-width: 800px;
  padding: 15px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
`
const StTitButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const StButton = styled.button`
    margin: 0 5px;
    width: 150px;
    height: 40px;
    border: none;
    background-color: #3858e9;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    :hover{
        background-color: #fff;
        color:#000
    }
    `
    const StTitName = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    `
    const StImgBox = styled.div`
        margin: 0 auto;
    `
    const StCommentBox = styled.div`
        display: flex;
        justify-content: space-between;
    `