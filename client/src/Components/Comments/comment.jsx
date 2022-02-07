//Third Party imports
import React, { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { FaRegCommentAlt, FaCommentAlt } from "react-icons/fa";
import Moment from "react-moment";
//StyleSheet imports
import style from "./comment.module.css";
//Local imports
import {
  getComment,
  updateComment,
} from "../../methods/crud/comment";
import {getReplyByCommentId} from "../../methods/crud/reply"
import Replies from "../Replies/replies";
import Loader from "../Skeleton Loader/Posts/post";

const Comment = ({ comm, user }) => {
  //UseState Declarations
  const [comment, setComment] = useState({});
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const [loader, setLoader] = useState(true);
  const [activeReply, setActiveReply] = useState(false);
  const [replies, setReplies] = useState([]);
  //UseEffect Declarations
  useEffect(() => {
    //Getting replies according to comment id
    const fetchReply = async () => {
      let data = await getReplyByCommentId(comm._id);
      setReplies(data);
    };
    fetchReply();
  });
  useEffect(() => {
    //Getting comment according to comment id
    const fetchData = async () => {
      let data = await getComment(comm._id);
      if (data.likeUsers.includes(user._id)) setLike(true);
      else if (data.dislikeUsers.includes(user._id)) setDislike(true);
      setLoader(false);
      setComment(data);
      setLoader(false);
    };

    fetchData();
  }, []);
  useEffect(() => {
    //Updating a comment according to comment id
    const updateComm = async (comment) => {
      await updateComment(comm._id, comment);
    };
    updateComm(comment);
  }, [comment]);
  //Finding the maximum between a and b
  const max = (a, b) => {
    if (a > b) return a;
    else return b;
  };

  //Updates the comment information when a user likes a comment
  const toggleLike = () => {
    if (dislike === true) {
      setDislike(false);
      setLike(true);

      setComment({
        ...comment,
        ["noOfLikes"]: comment.noOfLikes + 1,
        ["noOfDislikes"]: max(0, comment.noOfDislikes - 1),
        ["dislikeUsers"]: comment.dislikeUsers.filter(
          (curruser) => curruser !== user._id
        ),
        ["likeUsers"]: [...comment.likeUsers, user._id],
      });
    } else {
      if (like === true) {
        setLike(false);

        setComment({
          ...comment,
          ["noOfLikes"]: max(0, comment.noOfLikes - 1),
          ["likeUsers"]: comment.likeUsers.filter(
            (cuurUser) => cuurUser !== user._id
          ),
        });
      } else {
        setLike(true);

        setComment({
          ...comment,
          ["noOfLikes"]: comment.noOfLikes + 1,
          ["likeUsers"]: [...comment.likeUsers, user._id],
        });
      }
    }
  };
  //Updates comment information when a user dislikes a comment
  const toggleDislike = () => {
    if (like === true) {
      setLike(false);

      setDislike(true);

      setComment({
        ...comment,
        ["noOfLikes"]: max(0, comment.noOfLikes - 1),
        ["noOfDislikes"]: comment.noOfDislikes + 1,
        ["likeUsers"]: comment.likeUsers.filter(
          (currUser) => currUser !== user._id
        ),
        ["dislikeUsers"]: [...comment.dislikeUsers, user._id],
      });
    } else {
      if (dislike === true) {
        setDislike(false);

        setComment({
          ...comment,
          ["noOfDislikes"]: max(0, comment.noOfDislikes - 1),
          ["dislikeUsers"]: comment.dislikeUsers.filter(
            (currUser) => currUser !== user._id
          ),
        });
      } else {
        setDislike(true);

        setComment({
          ...comment,
          ["noOfDislikes"]: comment.noOfDislikes + 1,
          ["dislikeUsers"]: [...comment.dislikeUsers, user._id],
        });
      }
    }
  };
  const toggleReply = () => {
    if (activeReply) setActiveReply(false);
    else setActiveReply(true);
  };
  //Loader Functionality
  if (loader) <Loader />;
  return (
    <>
      <div className={`${style.individualCom}`}>
        <div className={`${style.commentHeaderInd}`}>
          {comment.username} <Moment fromNow>{comment.createdDate}</Moment>{" "}
        </div>
        <textarea
          className={`${style.commentBody}`}
          value={comment.description}
          readOnly
        />
        <div className={`${style.commentFooter}`}>
          <div className={`${style.like}`}>
            {like === false ? (
              <AiOutlineLike onClick={() => toggleLike()} />
            ) : (
              <AiFillLike onClick={() => toggleLike()} />
            )}
            {comment.noOfLikes}
          </div>
          <div className={`${style.dislike}`}>
            {dislike === false ? (
              <AiOutlineDislike onClick={() => toggleDislike()} />
            ) : (
              <AiFillDislike onClick={() => toggleDislike()} />
            )}
            {comment.noOfDislikes}
          </div>
          {activeReply ? (
            <FaCommentAlt
              className={`${style.replyIcon}`}
              onClick={() => toggleReply()}
            />
          ) : (
            <FaRegCommentAlt
              className={`${style.replyIcon}`}
              onClick={() => toggleReply()}
            />
          )}
          {replies.length}
        </div>
      </div>
      {activeReply && <Replies user={user} comment={comm} rep={replies} />}
    </>
  );
};

export default Comment;
