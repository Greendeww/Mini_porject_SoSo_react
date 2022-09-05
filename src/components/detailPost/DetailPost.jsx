import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import post, {likePost, _getPost} from '../../redux/modules/post'


function DetailPost(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();

    const {isLoading, error, post} = useSelector((state) => state.post)
    // console.log(post);
    
    useEffect(() => {
        dispatch(_getPost());
    },[dispatch])

    if(isLoading) {
        return <div>로딩중....</div>;
    }

    if(error) {
        return <div>{error.message}</div>
    }

    const detailPost = post.find(post => {
        return String(post.id) ===id
    });
    console.log(detailPost)

    
    return(
        <>
         <div>
            <div key={post.id}>
                <img alt="" src={detailPost.imageUrl}/>
                <p>{detailPost.title}</p>
                <button onClick={() => {
                    // let postld = {...detailPost, count:detailPost.count +1}
                    dispatch(likePost({...detailPost, count: detailPost.count+1}))}}>❤️</button>
                <span>{detailPost.count}</span>
                <div>
                    <button>삭제하기</button>
                    <button>수정하기</button>
                </div>
           </div> 
        </div>   
        </>
    )
}

export default DetailPost;