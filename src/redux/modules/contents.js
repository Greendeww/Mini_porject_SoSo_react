// const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     let req = {
//         title:title
//     }
//     let files = e.target.image.files[0];
//     // let title = e.target.title.value
//     const json =JSON.stringify(req);
//     let formData = new FormData();


//     console.log(json)
//     const blob = new Blob([json], {type: "application/json"});
//     console.log(blob)
//     formData.append("title",blob);
//     formData.append("imageUrl", files);
//     console.log(formData)
//     console.log(files)
//     const res = await axios.put('http://54.180.31.216/api/auth/post',formData,{
//         headers:{
//             "Content-Type": "multipart/form",
//         }
//     });
//     navigate("/");
//     return res.data;
    
//     // setTitle("");
    
//   };