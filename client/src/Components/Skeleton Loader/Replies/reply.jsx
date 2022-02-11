import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import styles from "./reply.module.css";
const Reply = () => {
  return (
    <div className={`${styles.reply}`}>
    <div className={`${styles.replyTop}`}>
      <div className={`${styles.userDate}`}>
          <div className={`${styles.skeleton} ${styles.skeleton_text}`}></div>
          <div className={`${styles.skeleton} ${styles.skeleton_text}`}></div>
      </div>
      
      <div className={`${styles.three_dots}`}><BsThreeDotsVertical /></div>
        
    </div>
    <textarea
      
     
      className={`${styles.replyCenter} ${styles.skeleton} ${styles.skeleton_text_description}`}
      readOnly
    />

    <div className={`${styles.replyButtom}`}>
      <div className={`${styles.like}`}>
       
          <AiOutlineLike />
       
      </div>
      <div className={`${styles.dislike}`}>
       
          <AiOutlineDislike  />
      
      </div>
    </div>
  </div>
  );
};

export default Reply;
