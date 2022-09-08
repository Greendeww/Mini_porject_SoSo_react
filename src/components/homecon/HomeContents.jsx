import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { _getPost } from '../../redux/modules/postSlice';
import { useParams } from "react-router-dom";
import { getCookie } from '../../shared/cookie';
// import HomeConModal from '../modal/HomeConModal';

const HomeContents = () => {
    let token = getCookie("ACCESS_TOKEN");
    let refresh = getCookie("REFRESH_TOKEN")
    const location = useLocation();

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    

    const {isLoading, error} = useSelector((state) => state?.postSlice)
    const post = useSelector((state)=> state.postSlice.post)
    console.log(useSelector((state) => state?.postSlice.data))  
  
    useEffect(() => {
      dispatch(_getPost());
    }, [dispatch]);
  
    if (isLoading) {
      return <div>로딩중....</div>;
    }
  
    if(error) {
      return <div>{error.message}</div>;
    }

    return (
        <>
         {post.map((posts) => {
                return(
                <StConBox key={posts.id} >
                    <StImgBox>
                    <Link to={"/main/detail/"+posts.id}>
                        <ImageSize>
                            <StImg src={posts.imageUrl} />
                        </ImageSize>
                        <StImgBoxLike>♥</StImgBoxLike>
                        </Link>
                    </StImgBox>
                    <StLikeBox>
                    <Detailpg>{posts.title}</Detailpg>
                <span>♡{posts.like}1</span>
                    </StLikeBox>
                </StConBox>)
            })}
            
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
    justify-content: space-between;
    align-items: center;
`
const Detailpg = styled.h4`
padding: 10px;
   &:hover{
   color: blue; 
   cursor: pointer;
   
   }
`