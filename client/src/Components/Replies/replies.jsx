//Third Party imports
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
import { MdSend } from "react-icons/md";
//StyleSheets imports
import style from "./replies.module.css";
import "react-toastify/dist/ReactToastify.css";
//Local imports
import { createReply, getReplyByCommentId } from "../../methods/crud/reply";
import Reply from "../Reply/reply";

const Replies = ({ user, comment, rep }) => {
  const [replies, setReplies] = useState(rep);
  const [reply, setReply] = useState({
    postId:comment.postId,
    commentId: comment?._id,
    username: user?.username,
    description: "",

    createdDate: new Date(),
    noOfLikes: 0,
    noOfDislikes: 0,
    likeUsers: [],
    dislikeUsers: [],
  });
  //Getting replies according to comment id
  useEffect(() => {
    const fetchReply = async () => {
      let data = await getReplyByCommentId(comment?._id);
      setReplies(data);
    };
    fetchReply();
  });
  //Stores  title , description & tags  of a reply
  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setReply({ ...reply, [name]: value });
  };

  //Saving Reply
  const saveReply = async (e) => {
    e.preventDefault();
    if (reply?.description !== "") {
      console.log(reply);
      await createReply(reply);
      setReply({ ...reply, "description": "" });
      swal("", "Reply created successfully", "success");
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
    <>
      <ToastContainer />
      <div className={`${style.replies}`}>
        <div className={`${style.writeReply}`}>
          <textarea
            className={`${style.replyArea}`}
            placeholder="Write your reply ... "
            name="description"
            value={reply?.description}
            onChange={handleInputs}
          />
          <MdSend onClick={(e) => saveReply(e)} />
        </div>
        {replies.map((reply,id) => (
          <Reply key={id} reply={reply} user={user} />
        ))}
      </div>
    </>
  );
};

export default Replies;
