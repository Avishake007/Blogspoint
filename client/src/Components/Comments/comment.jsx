//Third Party imports
import React, { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { FaRegCommentAlt, FaCommentAlt } from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";

//StyleSheet imports
import style from "./comment.module.css";
//Local imports
import {
  deleteComment,
  getComment,
  updateComment,
} from "../../methods/crud/comment";
import {deleteReplyByCommentId, getReplyByCommentId} from "../../methods/crud/reply"
import Replies from "../Replies/replies";
import Loader from "../Skeleton Loader/Comments/comment";
import Moment from "react-moment";
import UpdateComment from "../UpdateComment/updateComment";
import swal from "sweetalert";
import { getUserDetails } from "../../methods/crud/user";

const Comment = ({ comm, user }) => {
  //UseState Declarations
  const [comment, setComment] = useState({});
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [show,_show]=useState(false);
  const [loader, setLoader] = useState(true);
  const [activeReply, setActiveReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [open,_open]=useState(false);
  const [commenter,_commenter]=useState({});
  //UseEffect Declarations
  useEffect(() => {
    //Getting replies according to comment id
    const fetchReply = async () => {
      let data = await getReplyByCommentId(comm?._id);
      setReplies(data);
    };
    fetchReply();
  });
  useEffect(() => {
    //Getting comment according to comment id
    const fetchData = async () => {
      let data = await getComment(comm?._id);
      if (data.likeUsers.includes(user?._id)) setLike(true);
      else if (data.dislikeUsers.includes(user?._id)) setDislike(true);
      setLoader(false);
      setComment(data);
      setLoader(false);
    };

    fetchData();
  },[]);
  useEffect(() => {
    //Updating a comment according to comment id
    const updateComm = async (comment) => {
      await updateComment(comm?._id, comment);
    };
    updateComm(comment);
  }, [comment]);
  useEffect(()=>{
    const fetchData=async()=>{
      const data=await getUserDetails(comm?.userId);
      _commenter(data);
    }
    fetchData()
  },[])
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
        "noOfLikes": comment.noOfLikes + 1,
        "noOfDislikes": max(0, comment.noOfDislikes - 1),
        "dislikeUsers": comment.dislikeUsers.filter(
          (curruser) => curruser !== user?._id
        ),
        "likeUsers": [...comment.likeUsers, user?._id],
      });
    } else {
      if (like === true) {
        setLike(false);

        setComment({
          ...comment,
          "noOfLikes": max(0, comment.noOfLikes - 1),
          "likeUsers": comment.likeUsers.filter(
            (cuurUser) => cuurUser !== user?._id
          ),
        });
      } else {
        setLike(true);

        setComment({
          ...comment,
          "noOfLikes": comment.noOfLikes + 1,
          "likeUsers": [...comment.likeUsers, user?._id],
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
        "noOfLikes": max(0, comment.noOfLikes - 1),
        "noOfDislikes": comment.noOfDislikes + 1,
        "likeUsers": comment?.likeUsers.filter(
          (currUser) => currUser !== user?._id 
        ),
        "dislikeUsers": [...comment?.dislikeUsers, user?._id],
      });
    } else {
      if (dislike === true) {
        setDislike(false);

        setComment({
          ...comment,
          "noOfDislikes": max(0, comment?.noOfDislikes - 1),
          "dislikeUsers": comment?.dislikeUsers.filter(
            (currUser) => currUser !== user?._id
          ),
        });
      } else {
        setDislike(true);

        setComment({
          ...comment,
          "noOfDislikes": comment.noOfDislikes + 1,
          "dislikeUsers": [...comment.dislikeUsers, user?._id],
        });
      }
    }
  };
  //Function to toggle reply icon on click
  const toggleReply = () => {
    if (activeReply) setActiveReply(false);
    else setActiveReply(true);
  };
  //Function to toggle show update delete on click
  const showUpDel=()=>{
    if(show)_show(false)
    else _show(true)
  }
  const onOpenModal=()=>{
    _open((prev)=>(prev=true))
  }
  const onCLoseModal=()=>{
    _open((prev)=>(prev=false));
  }
  //Deleting a Comment with replies
  const deleteComm = async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment and replies",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        delet();
      } else {
        swal("Your Comment is safe!");
      }
    });
  };
  //Providing delay for ms milliseconds
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //Deleting...
  const delet = async () => {
    await deleteReplyByCommentId(comment?._id);
    await deleteComment(comment?._id);
    swal("", "Comment and its Replies deleted successfully", "success");
    await sleep(3000);
  };
  //Loader Functionality
  if (loader) return <Loader />;
  return (
    <>
      <div className={`${style.individualCom}`}>
     
      
        <div className={`${style.commentHeaderInd}`}>
          <div>
          <img src={`http://localhost:5000/${commenter?.profilePic}`} alt="Commenter Pic"/>{comment?.username}
          <Moment fromNow className={`${style.moment}`}>{comment?.createdDate}</Moment> 
          </div>
         { comm?.username===user?.username&&<div className={`${style.three_dots}`}><BsThreeDotsVertical onClick={()=>showUpDel()}/></div>}
          {show&&<div className={`${style.updel}`} >
            <div className={`${style.update}`} onClick={()=>onOpenModal()}>Update</div>
            <div className={`${style.delete}`} onClick={deleteComm}>Delete</div>
          </div>}
        </div>
        <textarea
          className={`${style.commentBody}`}
          value={comm?.description}
          readOnly
        />
        <div className={`${style.commentFooter}`}>
          <div className={`${style.like}`}>
            {like === false ? (
              <AiOutlineLike onClick={() => toggleLike()} />
            ) : (
              <AiFillLike onClick={() => toggleLike()} />
            )}
            {comment?.noOfLikes}
          </div>
          <div className={`${style.dislike}`}>
            {dislike === false ? (
              <AiOutlineDislike onClick={() => toggleDislike()} />
            ) : (
              <AiFillDislike onClick={() => toggleDislike()} />
            )}
            {comment?.noOfDislikes}
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
          {replies?.length}
        </div>
      </div>
      {activeReply && <Replies user={user} comment={comm} rep={replies} />}
      <UpdateComment open={open} onCLoseModal={onCLoseModal} comm={comm}/>
    </>
  );
};

export default Comment;
