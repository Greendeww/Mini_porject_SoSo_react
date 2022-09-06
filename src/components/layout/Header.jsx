import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <StLogo
        onClick={() => {
          navigate("/");
        }}
      >
        SoSo
      </StLogo>
        <StHeaderBox>
            <StButton onClick={() => {navigate("/post")}}>게시물 작성</StButton>
      <p>로그아웃</p>
      </StHeaderBox>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: calc(100%-0px);
  border: 1px solid #ddd;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
`;
const StHeaderBox= styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

`;
const StLogo = styled.h1`
    margin: 0;
    cursor: pointer;
`
const StButton = styled.button`
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