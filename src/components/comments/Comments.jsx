import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import nextId from "react-id-generator";
import { useParams } from "react-router-dom";
import { addComment } from "../../redux/modules/commentSlice";
import Com from "./Com";
const Comments = () => {
    const dispatch = useDispatch()
    const [review, setReview] = useState({});
    let { id } = useParams();
    const comments = useSelector((state) => state.commentSlice);
    console.log(comments)
    const onChangeHandler = (event) => {
        const comm = event.target.value;
        setReview({ ...review, id: nextId(), postId: id, commment: comm });
        console.log(review)
    };
    
    // let commentList = comments.filter((comment) => {
    //     return String(comment.post) === id;
    // });

    return (
        <>
            <div>
                <StCommentBox>
                    <input type="text"
                        onChange={onChangeHandler}
                        name="comment"
                    />
                    <button onClick={() => {
                        dispatch(addComment(review))
                    }}>댓글달기</button>
                </StCommentBox>
                <div>
                    {comments.map((commet) => {
                        return <Com key={commet.id} ment={commet} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Comments;

const StCommentBox = styled.div`
        display: flex;
        justify-content: space-between;
    `