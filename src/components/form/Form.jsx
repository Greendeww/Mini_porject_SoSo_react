import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/modules/post"
import nextId from "react-id-generator";
import Image from "../image/Image";
import axios from "axios";

function Form(){
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState();
    

    const onChangerHandler = (event,setState) => setState(event.target.value);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        let files = e.target.image.files[0];
        let title = e.target.title.value
        console.log(e.target.title.value)
        let formData = new FormData();


        formData.append("title", title);
        formData.append("imageUrl", files);

        const postSurvey = await axios({
            method: "POST",
            url: 'http://54.180.31.216/api/auth/post',
            mode:"cors",
            header : {
                "Content-Type": "multipart/form-data",
            },
            data: formData
        });
    };

    return(
     <>
        <form className="add-form" onSubmit={onSubmitHandler}>
        <div className="input-group">
            <div>
            <input
                placeholder="제목"
                name="title"
                type="text"
                required
            />

            <label htmlFor="imgFile">
                <input
                name="image"
                type="file"
                accept=".gif, .jpg, .png"
                mutliple="multiple"
                />
            </label>
            </div>
            <div>
            <button type="submit">등록</button>
            </div>
        </div>
        </form>

    </>
    )
   
}

export default Form;