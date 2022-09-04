import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import styled from "styled-components";
import HomeConModal from "../modal/HomeConModal";
import { likePost,hatePost } from '../../redux/modules/post'

function ImagePost({post}){
// console.log(post)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log(post.ImageUrl)
    const [isOpen,setIsOpen] = useState(false)
    const onClickButton = () => {
        setIsOpen(true)
    }

    const [like, setLike] = useState(false);


    const likeClick = () => {
        if(like){
            setLike(false)
            dispatch(hatePost({...post, count: post.count-1}))
        }else{
            setLike(true)
            dispatch(likePost({...post, count: post.count+1}))
        }
    }

    return(
        <>  {isOpen ===true ?<HomeConModal like={like} setLike={setLike} post={post} open = {isOpen} onClose  = {() =>{
            setIsOpen(false)
             }}/>:null}
            <StImgBox key={post.id }>
                <StImg src={post.imageUrl}/>
                <StImgBoxLike>❤️</StImgBoxLike>
            </StImgBox>
            <StLikeBox>
                <Detailpg onClick={() => onClickButton()}>{post.title}</Detailpg>
                <span> <p> {like
                        ? (<Like size="20px" style={{color:'red'}} bold onClick={likeClick}>
                        ♥
                      </Like>
                        ) : (
                      <Like size="20px" bold onClick={likeClick}>
                        ♡
                      </Like> 
                        )} {post.count} </p></span>
            </StLikeBox>
        </>
    )
}

const StImgBox = styled.div`
 
    max-width:300px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    padding: 0px 10px;
    margin-bottom: 5px;
    margin-top : 50px;
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
    width: 300px;
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: end;
    align-items: center;
    /* padding:  0px 10px; */
`

const Detailpg = styled.h4`
   &:hover{
   color: blue; 
   cursor: pointer;
   }
`
const Like = styled.div`
font-size : 30px;
padding-top: 30px;
`
export default ImagePost