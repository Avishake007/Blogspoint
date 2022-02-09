//Third party import
import React from "react";
import { Link } from "react-router-dom";
//Importing Stylesheets
import styles from "../../pages/Home/home.module.css";
const Post = ({ post ,authenticate}) => {
  return (
    <div className={`${styles.post}`}>
      <div className={`${styles.upper}`}>
        {/* Username */}
        <div className={`${styles.username}`}>{post.username}</div>
        {/* Read More */}
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={authenticate?`details/${post._id}`:'/signin'}
        >
          <button className={`btn ${styles.read_me}`}>Read More</button>
        </Link>
      </div>
      {/* Title */}
      <div className={`${styles.title}`}>{post.title}</div>
      {/* Description */}
      <div className={`${styles.description}`}>{post.description}</div>
    </div>
  );
};

export default Post;
