import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import styles from "./updateReply.module.css";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { updateReply } from '../../methods/crud/reply';
const UpdateReply = ({open,onCLoseModal,rep}) => {
  const [reply,_reply]=useState(rep);
  
  const handleInputs=(e)=>{
    let name,value;
    name=e.target.name;
    value=e.target.value;
    _reply({...reply,[name]:value})
  }
   //Providing delay for ms milliseconds
   function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //Saving a valid reply into the database
  const saveReply = async (e) => {
    e.preventDefault();
    if (reply?.description !== "") {
      await updateReply(reply?._id,reply);
      swal("", "Reply updated successfully", "success");
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
          placeholder='Write your reply ...'
          value={reply?.description}
          onChange={handleInputs}
        />
      </div>
      <div className={`${styles.update_btn_section}`}>
        <div className={`${styles.update_btn}`} onClick={saveReply}>Update Reply</div>
      </div>
    </div>
  </Modal>;
};

export default UpdateReply;
