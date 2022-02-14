import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import styles from "./updateReply.module.css";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { updateReply } from '../../methods/crud/reply';
import Spinner from '../Spinner/spin';
const UpdateReply = ({open,onCLoseModal,rep}) => {
  const [reply,_reply]=useState(rep);
  const [update,_update]=useState(false);
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
    if (reply?.description !== ""&&rep?.description!==reply?.description) {
      _update(true);
      await updateReply(reply?._id,reply);
      swal("", "Reply updated successfully", "success");
      sleep(3000);
      onCLoseModal();
      _update(false);
    } else {
      if(reply?.description==="")
      setTimeout(
        toast.error("Please do not keep the description empty", {
          position: "top-center",
        }),
        3000
      );
      else
      setTimeout(
        toast.error("Original and Updated reply should be different", {
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
        <div className={`${styles.update_btn}`} onClick={saveReply}>{update?<div style={{display:"flex"}}>Updating Your Reply <Spinner/></div>:"Update Your Reply"}</div>
      </div>
    </div>
  </Modal>;
};

export default UpdateReply;
