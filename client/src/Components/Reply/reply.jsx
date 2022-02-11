//Third Party imports
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
//StyleSheets imports
import styles from "./reply.module.css";
//Local Imports
import { updateReply,deleteReply} from "../../methods/crud/reply";
import Loader from "../Skeleton Loader/Replies/reply"
import UpdateReply from "../UpdateReply/updateReply";
import { BsThreeDotsVertical } from "react-icons/bs";
import swal from "sweetalert";
const Reply = ({ reply, user }) => {
  const [singleReply, _SingleReply] = useState(reply);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [loader,_loader]=useState(true);
  const [show,_show]=useState(false);
  const [open,_open]=useState(false);
  useEffect(() => {
    if (reply.likeUsers.includes(user._id)) setLike(true);
    else if (reply.dislikeUsers.includes(user._id)) setDislike(true);
    _loader(false)
  }, []);
  //Updating a reply
  useEffect(() => {
    const update = async (reply) => {
      await updateReply(reply._id, reply);
    };
    update(singleReply);
  }, [singleReply]);
  //Finding the maximum between a and b
  const max = (a, b) => {
    if (a > b) return a;
    else return b;
  };
  // Updates singleReply information when a user likes a reply
  const toggleLike = () => {
    if (dislike === true) {
      setDislike(false);
      setLike(true);

      _SingleReply({
        ...singleReply,
        "noOfLikes": singleReply.noOfLikes + 1,
        "noOfDislikes": max(0, singleReply.noOfDislikes - 1),
        "dislikeUsers": singleReply.dislikeUsers.filter(
          (curruser) => curruser !== user._id
        ),
        "likeUsers": [...singleReply.likeUsers, user._id],
      });
    } else {
      if (like === true) {
        setLike(false);

        _SingleReply({
          ...singleReply,
          "noOfLikes": max(0, singleReply.noOfLikes - 1),
          "likeUsers": singleReply.likeUsers.filter(
            (cuurUser) => cuurUser !== user._id
          ),
        });
      } else {
        setLike(true);

        _SingleReply({
          ...singleReply,
          "noOfLikes": singleReply.noOfLikes + 1,
          "likeUsers": [...singleReply.likeUsers, user._id],
        });
      }
    }
  };
  //Updates singleReply information when a user dislikes a singleReply
  const toggleDislike = () => {
    if (like === true) {
      setLike(false);

      setDislike(true);

      _SingleReply({
        ...singleReply,
        "noOfLikes": max(0, singleReply.noOfLikes - 1),
        "noOfDislikes": singleReply.noOfDislikes + 1,
        "likeUsers": singleReply.likeUsers.filter(
          (currUser) => currUser !== user._id
        ),
        "dislikeUsers": [...singleReply.dislikeUsers, user._id],
      });
    } else {
      if (dislike === true) {
        setDislike(false);

        _SingleReply({
          ...singleReply,
          "noOfDislikes": max(0, singleReply.noOfDislikes - 1),
          "dislikeUsers": singleReply.dislikeUsers.filter(
            (currUser) => currUser !== user._id
          ),
        });
      } else {
        setDislike(true);

        _SingleReply({
          ...singleReply,
          "noOfDislikes": singleReply.noOfDislikes + 1,
          "dislikeUsers": [...singleReply.dislikeUsers, user._id],
        });
      }
    }
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
  //Deleting a Reply
  const deleteRep = async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this reply",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        delet();
      } else {
        swal("Your Reply is safe!");
      }
    });
  };
  //Providing delay for ms milliseconds
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const delet = async () => {
    await deleteReply(singleReply._id);
    swal("", "Reply deleted successfully", "success");
    await sleep(3000);
  };
  if(loader)return <Loader/>
  return (
    <>
    <div className={`${styles.reply}`}>
      <div className={`${styles.replyTop}`}>
        <div>{reply.username}
        <Moment fromNow className={`${styles.moment}`}>{reply.createdDate}</Moment>

        </div>
        
        <div className={`${styles.three_dots}`}><BsThreeDotsVertical onClick={()=>showUpDel()}/></div>
          {show&&<div className={`${styles.updel}`} >
            <div className={`${styles.update}`} onClick={()=>onOpenModal()}>Update</div>
            <div className={`${styles.delete}`} onClick={()=>deleteRep()}>Delete</div>
          </div>}
      </div>
      <textarea
        name="description"
        value={reply.description}
        className={`${styles.replyCenter}`}
        readOnly
      />

      <div className={`${styles.replyButtom}`}>
        <div className={`${styles.like}`}>
          {like === false ? (
            <AiOutlineLike onClick={() => toggleLike()} />
          ) : (
            <AiFillLike onClick={() => toggleLike()} />
          )}
          {singleReply.noOfLikes}
        </div>
        <div className={`${styles.dislike}`}>
          {dislike === false ? (
            <AiOutlineDislike onClick={() => toggleDislike()} />
          ) : (
            <AiFillDislike onClick={() => toggleDislike()} />
          )}
          {singleReply.noOfDislikes}
        </div>
      </div>
    </div>
    <UpdateReply open={open} onCLoseModal={onCLoseModal} rep={reply}/>
    </>
  );
};

export default Reply;
