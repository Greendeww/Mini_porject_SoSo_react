import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/modules/post"



function Form(){

    const initialState = {
        title:"",
        imageUrl: "",
        count:0
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [post, setPost] = useState(initialState);

    const onChangerHandler = (e) => {
        const {name, value} =e.target;
        setPost({...post, [name]: value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(post.title.trim() === "" || post.imageUrl.trim() === ""){
            return alert("모든 항목을 입력해주세요!")};
            dispatch(createPost({...post, count:0}))
    }

    return(
        <>
            <div>
                <form onSubmit={onSubmitHandler}>
                    <p>이미지</p>
                    <img alt="" src="data:image/jpeg;base64,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"/>
                    <div>
                        <input type="text" name="imageUrl" value={post.imageUrl} onChange={onChangerHandler} placeholder="이미지 업로드 구역"></input>
                        <button>이미지 파일</button>
                    </div>
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