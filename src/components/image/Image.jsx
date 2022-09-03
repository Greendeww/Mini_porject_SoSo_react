import { useEffect, useState } from "react";
import { IoRemoveCircle } from "react-icons/io5";
import Carousel from 'react-bootstrap/Carousel'
import { FormCheck } from "react-bootstrap";
import {useHistory, useNavigate} from "react-router-dom"
import axios from "axios";


function Image(){
    let navigate = useNavigate();
    const [imgBase64, setImgBase64] = useState([]);
    const [imgFile, setImgFile] = useState(null);
    const [tag, setTag] = useState([]);
    const [comment,setComment] = useState();

    const handleChangeFile = (e) => {
        console.log(e.target.files)
        setImgFile(e.target.files);
        setImgBase64([]);
        for (let i=0; i<e.target.files.length; i++){
            if(e.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[i]);

                reader.onloadend = () => {
                    const base64 = reader.result;
                    console.log(base64)
                    if(base64) {
                        let base64Sub = base64.toString()

                        setImgBase64(imgBase64 => [...imgBase64,base64Sub]);
                    }
                }
            }
        }
    }
    const resetTag = () => {
        document.getElementById('innerinput').value='';
    }
    useEffect(resetTag,[tag])

    const setTags = (e) => {
        if(e.key == '' || e.key == 'Enter'){
            if(document.getElementById('innerunput').value !=''){
                setTag(tag => [...tag, e.target.value]);
            }else{
                alert('태그를 입력해주세요')
                return false;
            }
        }
    }
    const deleteTag = (index) => {
        let array = [...tag];
        array.splice(index,1);
        setTag(array)
    }

    const setComments = (e) => {
        setComment(e.target.vlaue)
    };

    const WriteBoard = async() => {
        if(imgFile == null){
            alert("이미지를 등록해주세요");
            return false;
        }
    
    const fd = new FormData();
    Object.values(imgFile).forEach((file) => fd.append("file",file));
    fd.append(
        "tag",
    tag
    );
    fd.append(
        "commnet",
    comment
    );

    const fd2 = new FormData();
    await axios.post('http://localhost:3001/post', fd,{
        headers: {
            "Content-Type": `multipart/form-data; `,
        }
    })
    .then((response) => {
        if(response.data){
            navigate('/')
        }
    })
    .catch((error) => {

    })
}
    return(
        <>
            <div>
                <input type='file' id='file' style={{display:'none'}}  onChange={handleChangeFile} multiple='multiple' />
                <label for='file' style={{border:'2px solid black', width:'700px'
                ,height:'300px',marginTop:'100px',fontSize:'40px'}}>
                 <strong>FILE UPLOAD Clisk here!</strong></label>
                 <div style={{minHeight:'70px',width:'700px',padding:'0px',textAlign:'left',overflow:'auto'}}>
                    <input id='innerinput'style={{border:'0px',height:'30px',width:'120px',paddingLeft:'12px'}} placeholder='#tag'
                    onKeyPress={setTags}></input>
                            {tag.map(((item,index) => {
                                return (<span><span>{item}</span><IoRemoveCircle
                                onClick={() => deleteTag(index)} style={{color:"red",fontSize:"20px"}} /></span>)
                            }))}
                 </div>
                 <textarea name='text' id='comment' placeholder="comment" style={{resize:'none'}} onChange={setComments}></textarea>
                 <button onClick={WriteBoard} style={{border:'2px solid black',width:'700px',fontSize:'40px'}}>작성완료</button>
                 <div style={{width:'700px', height:"560px",marginTop:'100px',marginLeft:'60px',border:'2px solid black'}}>
                    <Carousel interval={null}>
                    {imgBase64.map((item) => {
                    return(
                        <Carousel.Item>
                            <img
                                src={item}
                                alt='First slide'
                                style={{width:"100%",height:"550px"}}  
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                )
            })}
            </Carousel>
                 </div>
            </div>
            
        </>
    )

}

export default Image;
