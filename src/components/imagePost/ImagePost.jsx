import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";



function ImagePost({post}){
console.log(post)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(post.ImageUrl)

    return(
        <>
            <StImgBox key={post.id }>
                <StImg src={post.imageUrl}/>
                <StImgBoxLike>❤️</StImgBoxLike>
            </StImgBox>
            <StLikeBox>
                <Detailpg onClick={() => {navigate('/detail/'+post.id)}}>{post.title}</Detailpg>
                <span>❤️{post.count}</span>
            </StLikeBox>
        </>
    )
}

const StImgBox = styled.div`
    width: 100%;
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
    width: 100%;
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: end;
    align-items: center;
    padding:  0px 10px;
`

const Detailpg = styled.h4`
   &:hover{
   color: blue; 
   cursor: pointer;
   }
`
export default ImagePost