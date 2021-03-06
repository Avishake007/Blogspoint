import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";
import style from "./comment.module.css";
const Comment = () => {
  return (
    <div className={`${style.individualCom}`}>
        <div className={`${style.commentHeaderInd}`}>
          <div className={`${style.userDate}`}>
            <div className={`${style.skeleton} ${style.skeleton_img}`}></div>
          <div className={`${style.skeleton} ${style.skeleton_text}`}>
          
          </div>
          <div className={`${style.skeleton} ${style.skeleton_text}`}>
          </div>
          
          </div>
          <div className={`${style.three_dots}`}><BsThreeDotsVertical /></div>
         
        </div>
        <textarea
          className={`${style.commentBody} ${style.skeleton} ${style.skeleton_text_description}`}
         
          readOnly
        />
        
        <div className={`${style.commentFooter}`}>
          <div className={`${style.like}`}>
            
              <AiOutlineLike  />
           
          
          </div>
          <div className={`${style.dislike}`}>
          
              <AiOutlineDislike  />
           
          </div>
          
            <FaRegCommentAlt
              className={`${style.replyIcon}`}
            
            />
         
         
        </div>
      </div>
  );
};

export default Comment;
