import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import nextId from "react-id-generator";
import { useParams } from "react-router-dom";
import { addComment, __getCommnetsByPostId } from "../../redux/modules/commentSlice";
import { __addComment } from "../../redux/modules/commentSlice";
import Com from "./Com";
const Comments = () => {
    const dispatch = useDispatch()
    const [review, setReview] = useState({});
    let { id } = useParams();
    // console.log(id)
    useEffect(() => {
        dispatch(__getCommnetsByPostId(id));
      }, [dispatch]);
   
    const comments = useSelector((state) => state.commentSlice.comments);
    // console.log(useSelector((state) => state.commentSlice.comments))
    const onChangeHandler = (event) => {
        const comm = event.target.value;
        setReview({ ...review, postId: id, comment: comm });
        console.log(review)
    };


    // let commentList = comments.filter((comment) => {
    //     return String(comment.id) === id;})
        



    const payload = {

        postId:id,

        comment:review.comment
    }
    return (
        <>
            <div>
                <StCommentBox>
                    <StInput type="text"
                        onChange={onChangeHandler}
                        name="comment"
                    />
                    <StButton onClick={() => {
                        dispatch(__addComment(payload))
                    }}>댓글달기</StButton>
                </StCommentBox>
                <div>
                    {comments.map((commet) => {
                        console.log(commet)
                        return <Com key={commet.id} ment={commet} arg = {id} />;
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
const StInput = styled.input`
    width: 70%;
    height: 30px;
    border: 1px solid #eee;
`
const StButton = styled.button`
    width: 150px;
    height: 30px;
    background-color: #67df;
    border: none;
    border-radius: 10px;
    color: #fff;
`