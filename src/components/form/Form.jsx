import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/modules/post"
import nextId from "react-id-generator";
import Image from "../image/Image";


function Form(){
    const [imgBase64, setImgBase64] = useState([]);
    const [imgFile, setImgFile] = useState(null);
    console.log(imgBase64)



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

    const initialState = {
        title:"",
        imageUrl: "",
        count:0,
        id:0
    }

    const comId = nextId();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [post, setPost] = useState(initialState);
    

    const onChangerHandler = (e) => {
        const {name, value} =e.target;
        setPost({...post, [name]: value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(post.title.trim() === ""){
            return alert("모든 항목을 입력해주세요!")};
            dispatch(createPost({...post, count:0, id:comId, imageUrl:[...imgBase64]}))
            navigate('/')
    }

    console.log(post)
    return(
        <>
            <div>
                <form onSubmit={onSubmitHandler}>
                    <p>이미지</p>
                    <Image imgBase64={imgBase64} />
                    <input type="file" id="file" onChange={handleChangerFile} mutliple="multiple"/>
                    <div>
                        <p>제목</p>
                        <input type='text' placeholder="제목을 입력하세요" name="title" value={post.title} onChange={onChangerHandler}></input>
                    </div>
                    <button>추가하기</button>
                    <button onClick={() => {navigate('/')}}>이전으로</button>
                </form>
            </div>
        </>
    )
}

export default Form;