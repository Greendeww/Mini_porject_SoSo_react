import { useState } from "react";
import { useDispatch } from "react-redux/";
import { __updateComment} from "../../redux/modules/commentSlice"
import styled from "styled-components";
const Commentmodal = ({ ment, close ,arg}) => {
  // console.log(ment)
  let dispatch = useDispatch();
  const initialState = {
    id: ment.id,
    comment:ment.comment
  };
// console.log(ment.comment)
  const [ment1, setMent] = useState(initialState);
  // console.log(ment1)
  const [desc, setDesc] = useState(ment1.comment);
 
 const payload = {
  nickname:ment.nickname,
  postId:arg,
  id:ment.id,
  comment:desc,
  
 }
console.log(ment)
console.log(payload)
  return (
    <>
      <div className="black-bg show-modal">
        <div className="white-bg">
          <h4>댓글 수정하기</h4>
          <LabelContainer>
            <div>
              <Label>내용</Label>
              <Input
                className="input"
                type="text"
                value={desc}
                onChange={(e) => {
                  console.log(e.target.value)
                  setDesc(e.target.value);
                }}
              />
            </div>
            <Button
              className="btn btn-danger"
              onClick={() => {
                dispatch(__updateComment(payload));
                close();
              }}
            >
              수정하기
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => {
                close();
              }}
            >
              닫기
            </Button>
          </LabelContainer>
        </div>
      </div>
    </>
  );
};

export default Commentmodal;

const LabelContainer = styled.div`
  display: flex;
`;
const Label = styled.label`
  margin-left: 10px;
`;
const Button = styled.button`
  border: none;
  width: 100px;
  height: 20px;
  margin-left: 10px;
`;
const Input = styled.input`
  border: 1px solid #eee;
  height: 20px;
  margin-left: 10px;
`;
