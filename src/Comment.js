import React, { useState } from "react";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  replyComment,
  deleteReplyComment,
  replyLike,
} from "./Action";
import "./App.css";

export default function Comment() {
  const data = useSelector((state) => state.mainReducer);
  console.log(data, "mainReducer Data");
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
      <Button variant="success"
        className="addButton"
        onClick={() => {
          setShow(true);
        }}
      >
        Add Comment
      </Button>

      <br />
      <br />

      <Modal show={show || show2}>
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
            variant="outline-info"
            onClick={() => {
              {
                show
                  ? dispatch(addComment(inputData))
                  : dispatch(replyComment(inputData, idToReply));
              }
              setShow(false);
              setShow2(false);
              setInputData("");
            }}
          >
            Comment
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              setShow(false);
              setShow2(false);
              setInputData("");
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div>
        {data.map((data) => {
          return (
            <div key={data.id} className="commentContainer">
              <div className="commentDiv">
                <h3>{data.comment}</h3>
                <div className="commentButtons">
                  <Button variant="outline-dark" onClick={() => replyFunction(data.id)}>
                    Reply
                  </Button>
                  &nbsp;
                  <Button
                    variant="outline-danger"
                    onClick={() => dispatch(deleteComment(data.id))}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              {data.replyComments.length > 0 &&
                data.replyComments.map((reply) => {
                  return (
                    <div className="replyContainer" key={reply.replyId}>
                      <h4>{reply.reply}</h4>
                      <div className="replyDivButtons">
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            dispatch(replyLike(data.id, reply.replyId));
                          }}
                        >
                          {reply.likes} Likes
                        </Button>
                        &nbsp;
                        <Button
                          variant="outline-danger"
                          onClick={() =>
                            dispatch(deleteReplyComment(data.id, reply.replyId))
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
