import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/modules/post"
import nextId from "react-id-generator";
import Image from "../image/Image";
import axios from "axios";

function Form(){
    // const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState();
    const [fileImage, setFileImage] = useState("");
    const [imageUrl, setImageUrl] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onChangeImg = (e) => {
        setImageUrl(e.target.files[0]);
        console.log(e.target.files[0])
        setFileImage(URL.createObjectURL(e.target.files[0]))
    }

    const onChangeHandler = (event) => {
        setTitle(event.target.value);
        console.log(event.target)
      };
    

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let req = {
            title:title
        }
        let files = imageUrl;
        console.log(e.target.image.files[0]);
        const json =JSON.stringify(req);
        let formData = new FormData();

  
        console.log(json)
        const blob = new Blob([json], {type: "application/json"});
        console.log(blob)
        formData.append("title",blob);
        formData.append("imageUrl", files);
        console.log(formData)
        console.log(files)
        const res = await axios.post('http://54.180.31.216/api/auth/post',formData,{
            headers:{
                "Content-Type": "multipart/form",
            }
        });
        navigate("/");
        return res.data;
        
        // setTitle("");
        
      };
            
    
            
    ;

    return(
     <>
        <form className="add-form" onSubmit={onSubmitHandler}>
        <div className="input-group">
            <div>
            <input
                placeholder="제목"
                name="title"
                type="text"
                value={title||''}
                onChange={onChangeHandler}
                // required
            />
            <img className="img" alt="" src={fileImage}></img>
            <label htmlFor="imageUrl">
                <input
                name="image"
                type="file"
                accept=".gif, .jpg, .png"
                mutliple="multiple"
                id="imageUrl"
                onChange={onChangeImg}
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