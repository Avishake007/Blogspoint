//Third Party imports
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
//StyleSheet imports
import styles from "./singlecomment.module.css";
//Local imports
import { createComment,getCommentByPostId } from "../../methods/crud/comment";
import Comment from "../Comments/comment.jsx";

const SingleComment = ({ match, userData }) => {
  //UseState Declarations
  const [comment, setComment] = useState({
    postId: match.params.id,
    username: userData.username,
    description: "",
    createdDate: new Date(),
    noOfLikes: 0,
    noOfDislikes: 0,
    likeUsers: [],
    dislikeUsers: [],
  });
  const [comments, setComments] = useState([]);
  //UseEffect Declarations
  useEffect(() => {
    const fetchComment = async () => {
      let data = await getCommentByPostId(match.params.id);
      setComments(data.reverse());
    };
    fetchComment();
  });
  //Getting the comment information and store it in comment state
  const handleInputs = (e) => {
    var name, value;
    name = e.target.name;
    value = e.target.value;
    setComment({ ...comment, [name]: value });
  };
  //Providing delay for ms milliseconds
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //Saving a valid comment into the database
  const saveComment = async (e) => {
    e.preventDefault();
    if (comment.description !== "") {
      await createComment(comment);
      swal("", "Comment created successfully", "success");
      sleep(3000);
      setComment({ ...comment, description: "" });
    } else {
      setTimeout(
        toast.error("Please do not keep the description empty", {
          position: "top-center",
        }),
        3000
      );
    }
  };
  return (
    <div className={`${styles.comment}`}>
      <div className={`${styles.writeComment}`}>
        <div className={`${styles.commentHeader}`}>Comments : </div>
        <textarea
          className={`${styles.commentArea}`}
          placeholder="Write your comment"
          name="description"
          value={comment.description}
          onChange={handleInputs}
        />
        <button className={`${styles.commentBtn}`} onClick={saveComment}>
          COMMENT
        </button>
      </div>
      {comments.map((comm,_) => (
        <div className={`${styles.allComments}`} key={_}>
          <Comment comm={comm} user={userData} />
        </div>
      ))}
    </div>
  );
};

export default SingleComment;
