import ImagePost from '../imagePost/ImagePost'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { _getPost } from '../../redux/modules/post';



const HomeContents = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const {isLoading, error, post} = useSelector((state) => state?.post)
      // console.log( useSelector((state) => state?.post))  
    
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
        <StConBox >
             {post.map((post) => (<ImagePost post={post} key={post.id}/>))}

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
min-width: 100%;
width: 3000px;
flex-wrap: wrap;
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
const Detailpg = styled.h4`
   &:hover{
   color: blue; 
   cursor: pointer;
   }
`