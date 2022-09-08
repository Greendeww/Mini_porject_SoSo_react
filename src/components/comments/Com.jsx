import React from "react";
import { useDispatch } from "react-redux/";
import { deleteComment } from "../../redux/modules/commentSlice";
import { useState } from "react";
import Commentmodal from "./Commentmodal";
import styled from "styled-components";
import { __deleteComment } from "../../redux/modules/commentSlice";
const Com = ({ ment, arg }) => {
  const dispatch = useDispatch();
  let [modal, setModal] = useState(false);
  const close = () => {
    setModal(false);
  };
  const payload = {
    postId:arg.id,
    id:ment.id
  }
  
  return (
    <>
      {modal ? <Commentmodal arg = {arg} ment={ment} close={close} /> : null}
      <StMent className="list" key={ment.id}>
        <h4>{ment.nickname}</h4>
        <TextBox>{ment.comment}</TextBox>
        <div>
        <StButton
          onClick={() => {
            setModal(true);
          }}
        >
          수정하기
        </StButton>
        <StButton
          onClick={() => {
            dispatch(__deleteComment(payload));
            // console.log(ment.id);
          }}
        >
          삭제하기
        </StButton>
        </div>
      </StMent>
    </>
  );
};

export default Com;
const StMent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const TextBox = styled.p`
  text-align:left;
  width: 300px;
`
const StButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  margin: 5px;
  border-radius: 5px;
`