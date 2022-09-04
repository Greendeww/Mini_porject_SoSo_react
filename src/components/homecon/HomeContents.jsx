import React from 'react'
import styled from 'styled-components'
import { Link, Outlet, useLocation } from "react-router-dom";
// import HomeConModal from '../modal/HomeConModal';

const HomeContents = () => {

    const location = useLocation();

    return (
        <>
            <StConBox >
            
        
                <StImgBox>
                <Link to="/detail" state={{ background: location }}>
                
                    <ImageSize>
                        <StImg src="https://i.pinimg.com/564x/d9/c8/25/d9c8256448c3b7c1f8dc190264b1283c.jpg" alt="" />
                    </ImageSize>
                    <StImgBoxLike>❤️</StImgBoxLike>
                    </Link>
                    <Outlet />

                </StImgBox>
      
                <StLikeBox>
                
                    <span>❤️ 1</span>
                </StLikeBox>
            </StConBox>
        </>
    )
}

export default HomeContents


const StConBox = styled.div`
   border-radius: 15px;
margin-bottom:1rem;
background-color: white;
// 줄바꿈 방지
display:inline-block;
min-width: 20%;
`
const StImgBox = styled.div`
position: relative;
display: inline-flex;
width: 100%;
border-radius: 10px;
overflow: hidden;
    
:hover {
  cursor:pointer;
  box-shadow: rgba(0,0,0,0.2) 0 0 10px 3px;
}
`
const ImageSize = styled.div`
min-width:22vw;
`
const StImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
`