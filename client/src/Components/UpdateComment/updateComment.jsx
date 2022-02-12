import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import styles from "./updateComment.module.css";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { updateComment } from '../../methods/crud/comment';
const UpdateComment = ({open,onCLoseModal,comm}) => {
  const [comment,_comment]=useState(comm);
  
  const handleInputs=(e)=>{
    let name,value;
    name=e.target.name;
    value=e.target.value;
    _comment({...comment,[name]:value})
  }
   //Providing delay for ms milliseconds
   function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //Saving a valid comment into the database
  const saveComment = async (e) => {
    e.preventDefault();
    if (comment?.description !== "") {
      await updateComment(comment?._id,comment);
      swal("", "Comment updated successfully", "success");
      sleep(3000);
      onCLoseModal();
    } else {
      setTimeout(
        toast.error("Please do not keep the description empty", {
          position: "top-center",
        }),
        3000
      );
    }
  };
  return <Modal open={open} onClose={onCLoseModal} center >
    <div className={`${styles.update_box}`}>
      <div className={`${styles.desc_section}`}>
      <textarea
          name="description"
          placeholder='Write your comment ...'
          // className={`${style.commentBody}`}
          value={comment?.description}
          onChange={handleInputs}
        />
      </div>
      <div className={`${styles.update_btn_section}`}>
        <div className={`${styles.update_btn}`} onClick={saveComment}>Update Comment</div>
      </div>
    </div>
  </Modal>;
};

export default UpdateComment;
