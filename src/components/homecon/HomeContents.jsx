import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
const HomeContents = () => {

  const navigate = useNavigate();
    
  return (
    <Stcontainer>
        <StConBox>
            <StImgBox>
                <StImg importance="auto" src="" alt="" />
                <StImgBoxLike>❤️</StImgBoxLike>
            </StImgBox>
            <StLikeBox>
                <span>❤️ 1</span>
            </StLikeBox>
        </StConBox>
    </Stcontainer>
  )
}

export default HomeContents
const Stcontainer = styled.div`
    padding: 30px;
`

const StConBox = styled.div`
    width: 250px;
    
`
const StImgBox = styled.div`
    width: 100%;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    padding: 0px 10px;
    margin-bottom: 5px;
`;
const StImg = styled.img`
    border: 0;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
    position: absolute;
`
const StImgBoxLike = styled.p`
    position: absolute;
    right: 5px;
    top: 5px;
`
const StLikeBox = styled.div`
    width: 100%;
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: end;
    align-items: center;
    padding:  0px 10px;
`