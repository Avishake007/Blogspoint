//Third party import
import React from "react";
import { Link } from "react-router-dom";
//Importing Stylesheets
import styles from "../../pages/Home/home.module.css";
const Post = ({ post ,authenticate}) => {
  return (
    <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={authenticate?`details/${post?._id}`:'/signin'}
        >
    <div className={`${styles.post}`}>
      <div className={`${styles.upper}`}>
        {/* Username */}
        <div className={`${styles.username}`}>{post?.username}</div>
      </div>
      {/* Title */}
      <div className={`${styles.title}`}>{post?.title}</div>
      {/* Description */}
      <div className={`${styles.description}`}>{post?.description.substring(0,50)}{post?.description.length>50&&"..."}</div>
    </div>
    </Link>
  );
};

export default Post;
