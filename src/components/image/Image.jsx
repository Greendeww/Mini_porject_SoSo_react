import { useEffect, useState } from "react";
import { IoRemoveCircle } from "react-icons/io5";
import Carousel from 'react-bootstrap/Carousel'
import { FormCheck } from "react-bootstrap";
import {useHistory, useNavigate} from "react-router-dom"
import axios from "axios";
import ImagePost from "../imagePost/ImagePost";


function Image({imgBase64}){
    

    return(
        <>
            <div>
                <div>
                    {/* <label for="file"><strong>File Upload Click here!</strong></label> */}
                    {/* <div style={{minHeight:'70px' ,width:'700px', padding:'0px',textAlign:'left',overflow:'auto'}}></div> */}
                    <div>
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
                    </div>
                    
                    
                </div>
            </div>
        </>
    )
  }

export default Image;
