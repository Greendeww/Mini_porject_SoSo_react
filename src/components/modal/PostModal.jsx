import React from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import { useNavigate, useParams} from 'react-router-dom'
import Image from '../image/Image';
import { useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel'
import {updatePost} from '../../redux/modules/post'
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { _getPost } from '../../redux/modules/post';

function PostModal(){
    const initialState = {
        title:"",
        imageUrl: "",
        count:0,
        id:0
    }

    const navigate = useNavigate();
    let dispatch = useDispatch();
    const {id} = useParams();
    const [data,setData] = useState(initialState);
    const [title,setTitle] = useState(data.title)
    const [imgBase64, setImgBase64] = useState([]);
    const [imgFile, setImgFile] = useState(null);
    

    const {isLoading, error, post} = useSelector((state) => state.post)
    

    useEffect(() => {
        dispatch(_getPost());
      }, [dispatch]);

      if (isLoading) {
        return <div>로딩중....</div>;
      }

      if(error) {
        return <div>{error.message}</div>;
      }

      const list = post.find(post => {
        return String(post.id) === id
    });

    console.log(list)
    const handleChangerFile = (e) => {
        // console.log(e.target.files);
        setImgFile(e.target.files);
        setImgBase64([]);
        for(let i=0; i<e.target.files.length; i++){
            if(e.target.files[i]){
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[i]);
                reader.onloadend = () => {
                    const base64 = reader.result;
                    if (base64) {
                        let base64Sub = base64.toString()

                        setImgBase64(imgBase64 => [...imgBase64,base64Sub]);
                    }
                }
            }
        }
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // if(post.title.trim() === ""){
        //     return alert("모든 항목을 입력해주세요!")};
            dispatch(updatePost({...list, imageUrl:[...imgBase64]}))
            navigate('/')
    }


    return (
        <StModal onSubmit={onSubmitHandler} >
            <StModalBox>
                <form >
                    <StTitButton >
                        <h1>수정페이지</h1>
                        <div>
                        <StButton>수정하기</StButton>
                        <StButton onClick={()=>navigate('/')}>이전으로</StButton>
                        </div>
                    </StTitButton>
                    <StImgBox>
                    <div style={{width:'700px', height:"560px",marginTop:'30px',marginBottom:'50px', marginLeft:'60px',border:'2px solid black'}}>
                            <div interval={null}>
                            {imgBase64.map((item) => {
                                return(
                                    <Carousel.Item>
                                        <img
                                            src={item}
                                            alt="First slide"
                                            style={{width:"100%",height:"550px"}}
                                        />
                                    </Carousel.Item>
                                )
                            })}
                            </div>
                    </div>
                        <input type="file" id="file" onChange={handleChangerFile} mutliple="multiple"/>
                    </StImgBox>
                    <StTitName>
                        <h1>
                            {list.title}
                        </h1>
                        <input className="input" type="text" name="title" value={title}
                         onChange={(e)=>{setTitle(e.target)}}/>
                        <p>❤️ 2</p>
                    </StTitName>
                </form>
            </StModalBox>
        </StModal>
    )
}


export default PostModal;

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