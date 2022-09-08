import React from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import { useNavigate, useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { _getPost } from '../redux/modules/postSlice';
import { _updatePost,updatePost } from '../redux/modules/postSlice';
import { getCookie } from '../shared/cookie';

function UpdatePost(){

    let token = getCookie("ACESS_TOKEN");
    let refresh = getCookie("REFRESH_TOKEN");
    const initialState = {
        id:0,
        title:"",
        imageUrl: "",
        
    }

    const navigate = useNavigate();
    let dispatch = useDispatch();
    const {id} = useParams();
    const [data,setData] = useState(initialState);
    const [title,setTitle] = useState(data.title);
    // const [imgBase64, setImgBase64] = useState([]);
    const [imgFile, setImgFile] = useState(null);
    const [fileImage, setFileImage] = useState("");
    

    const {isLoading, error, post} = useSelector((state) => state.postSlice)
    console.log(post)

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
        return (post.id) === Number(id)
    });
    
    const onUpdateHandler = async (e) => {
        console.log(imgFile)
        e.preventDefault();
        let req = {
           
            title:title
        }
        // let files = e.target.image.files[0];
        // console.log(e.target.image.files[0])
        const json =JSON.stringify(req);
        console.log(json)
        let formData = new FormData();

        const blob = new Blob([json], {type: "application/json"});
        formData.append("title",blob);
        formData.append("imageUrl", imgFile);
        
        console.log(formData)
        const payload = {
            id:id,
            data: formData,
            // token : token,
            // refresh : refresh
        }
        
        dispatch(_updatePost(payload))
        dispatch(updatePost(payload))
        // navigate("/");
        for(let value of formData.values()) {
            console.log(value);
            }
      };
      const onChangeHandler = (event) => {
        setTitle(event.target.value);

      };
      const onChangeFileHandler = (event) => {
        setImgFile(event.target.files[0]);
        setFileImage(URL.createObjectURL(event.target.files[0]));
        console.log(event.target.files[0])
      };

    return (
        <StModal >
            <StModalBox>
                <form >
                    <StTitButton >
                        <h1>수정페이지</h1>
                        <div>
                        <StButton onClick={onUpdateHandler}>수정하기</StButton>
                        <StButton onClick={()=>navigate('/main')}>이전으로</StButton>
                        </div>
                    </StTitButton>
                    <StImg>
                        <Img className="img" alt="" src={fileImage}></Img>
                    </StImg>
                    <StImgBox>
                    {/* <div style={{width:'700px', height:"560px",marginTop:'30px',marginBottom:'50px', marginLeft:'60px',border:'2px solid black'}}>
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
                    </div> */}
                    <Div>
                        <label htmlFor="imageUrl">
                            <ImageInput
                            name="image"
                            type="file"
                            accept=".gif, .jpg, .png"
                            mutliple="multiple"
                            id="imageUrl"
                            onChange={onChangeFileHandler}
                            />
                        </label>
                    </Div>
                    </StImgBox>
                    <StTitName>
                        <h1>
                            {list.title}
                        </h1>
                        <InputText
                            placeholder="수정할 제목을 입력해주세요"
                            name="title"
                            type="text"
                            value={title||''}
                            onChange={onChangeHandler}
                            // required
                        />
                    </StTitName>
                </form>
            </StModalBox>
        </StModal>
    )
}


export default UpdatePost;

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
  background-color:#fff;
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
    background-color:#3858e9;
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
    margin-top: 50px;
    `
    const StImgBox = styled.div`
        margin: 0 auto;
    `
    const StCommentBox = styled.div`
        display: flex;
        justify-content: space-between;
    `
    const StImg = styled.div`
    width: 300px;
    height: 310px;
    background-color: #fff;
    border: none;
    margin: 0 auto;  
    `
    const Img = styled.img`
    width: 300px;
    height: 310px;
    background-color: #fff;
    border: 1px solid #eee;
    margin: 0 auto;
    `
    const ImageInput = styled.input`
        color:red;
        margin: auto;
        margin-left: 70px;
        /* display:none; */
    `
    const Div = styled.div`
        margin-top:20px;
    `
    const InputText = styled.input`
        display:block;
        width:280px;
        height: 25px;
        border: 2px solid #e2e2e2;
      
    `