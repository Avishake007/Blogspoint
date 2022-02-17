import React from "react";
import styles from "./shortPost.module.css";
const ShortPost = () => {
  return (
    <div className={`${styles.post}`}>
      <div className={styles.profilePic}>
        <div className={`${styles.skeleton} ${styles.skeleton_img}`}></div>
      </div>

      <div className={styles.postDetails}>
        <div className={`${styles.upper} `}>
          {/* Username */}
          <div className={`${styles.username} ${styles.skeleton} ${styles.skeleton_text}`}></div>
        </div>
        {/* Title */}
        <div className={`${styles.title} ${styles.skeleton} ${styles.skeleton_text}`}></div>
        {/* Description */}
        <div className={`${styles.description} `}>
            <p className={`${styles.skeleton} ${styles.skeleton_text_description}`}></p>
            <p className={`${styles.skeleton} ${styles.skeleton_text_description}`}></p>
        </div>
      </div>
    </div>
  );
};

export default ShortPost;
