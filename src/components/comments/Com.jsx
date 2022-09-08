import React from "react";
import { useDispatch } from "react-redux/";
import { deleteComment } from "../../redux/modules/commentSlice";
import { useState } from "react";
import Commentmodal from "./Commentmodal";
const Com = ({ ment, id }) => {
  console.log(id)
  const dispatch = useDispatch();
  let [modal, setModal] = useState(false);
  const close = () => {
    setModal(false);
  };
  return (
    <>
      {modal ? <Commentmodal ment={ment} close={close} /> : null}
      <div className="list" key={ment.id}>
        <h4>dd</h4>
        <p>{ment.comment}</p>
        <button
          onClick={() => {
            setModal(true);
          }}
        >
          수정하기
        </button>
        <button
          onClick={() => {
            dispatch(deleteComment(ment.id));
            // console.log(ment.id);
          }}
        >
          삭제하기
        </button>
      </div>
    </>
  );
};

export default Com;
