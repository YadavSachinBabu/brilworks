import React, { useState } from "react";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment, replyComment,deleteReplyComment} from "./Action";

export default function Comment() {
  const data = useSelector((state) => state.mainReducer);
  console.log(data);
  const dispatch = useDispatch();
  const [idToReply, setIdToReply] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [inputData, setInputData] = useState("");
  const replyFunction = (id) => {
    setIdToReply(id);
    setShow2(true);
  };
  return (
    <div>
      <Button
        style={{ float: "right" }}
        onClick={() => {
          setShow(true);
        }}
      >
        Add Comment
      </Button>

      <br />
      <br />

      <Modal show={show}>
        <ModalBody>
          <FormControl
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value);
            }}
            placeholder="Type Your Comment Here"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              dispatch(addComment(inputData));
              setShow(false);
              setInputData("");
            }}
          >
            Comment
          </Button>
          <Button
            onClick={() => {
              setShow(false);
              setInputData("");
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal show={show2}>
        <ModalBody>
          <FormControl
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              dispatch(replyComment(inputData, idToReply));
              setShow2(false);
              setInputData("");
            }}
          >
            Comment
          </Button>
          <Button onClick={() => setShow2(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <div >
        {data.map((data) => {
          return (
            <div key={data.id} style={{border:"2px solid black",borderRadius:"10px",background:"grey"}} >
              <div
                style={{ display: "flex", justifyContent: "space-between",marginTop:"5px",marginLeft:"5px"}}
                
              >
                <h3 style={{border:"2px solid black",width:"91%",borderRadius:"10px"}}>{data.comment}</h3>
                <div>
                  <Button onClick={() => replyFunction(data.id)}>REPLY</Button>
                  <Button onClick={() => dispatch(deleteComment(data.id))}>
                    {" "}
                    DELETE
                  </Button>
                </div>
              </div>
              {
                  data.replyComment != ""  ? (<div style={{display:"flex",justifyContent:"space-between",marginLeft: "5rem" }}>
                  <h4 style={{border:"2px solid black",width:"90%",borderRadius:"10px"}}>{data.replyComment}</h4>
                  <div>
                  <Button>Likes {data.likes}</Button>
                  <Button onClick={()=>dispatch(deleteReplyComment(data.id))}>Delete</Button>
                  </div>
                </div>) : ""
              }
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
