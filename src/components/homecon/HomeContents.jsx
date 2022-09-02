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
  
  const {isLoading, error, post} = useSelector((state) => state.post)
//   console.log(post)  

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
    <Stcontainer>
        <StConBox>
            {post.map((post) => (<ImagePost post={post} key={post.id}/>))}
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
    flex-wrap: wrap;
    display: flex;
    gap: 15px;
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