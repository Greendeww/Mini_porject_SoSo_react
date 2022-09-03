import { useState } from "react";



function Image(){
    const [imgBase64, setImgBase64] = useState([]);
    const [imgFile, setImgFile] = useState(null);

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

    return(
        <>
            <div>
                <input type='file' id='file' onChange={123} multiple='multiple' />
            </div>
        </>
    )

}

export default Image;
