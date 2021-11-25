import React from 'react'
import styles from './post.module.css';
const Post = () => {
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.first_inner_container}`}>
                    <div className={`${styles.title}`}>

                        <p className={`${styles.skeleton} ${styles.skeleton_text}`}>

                        </p>
                    </div>

                </div>
                <div className={`${styles.second_inner_container}`}>
                    <p className={`${styles.skeleton} ${styles.skeleton_text}`}>
                        {/* title  */}

                        {/* {post.username} */}
                    </p>
                    <p className={`${styles.created}`}>
                        <label htmlFor="Created_date">Created Date : </label>
                        <p className={`${styles.skeleton} ${styles.skeleton_text}`}>
                            {/* title  */}
                        </p>
                        {/* {new Date(post.createdDate).toDateString()} */}
                    </p>

                </div>


                <div
                    className={`${styles.third_inner_container}`}


                    name="description"


                >
                    <p className={`${styles.skeleton} ${styles.skeleton_text_description}`}>
                    </p>
                    <p className={`${styles.skeleton} ${styles.skeleton_text_description}`}>
                    </p>
                    <p className={`${styles.skeleton} ${styles.skeleton_text_description}`}>
                    </p>
                    <p className={`${styles.skeleton} ${styles.skeleton_text_description}`}>
                    </p>

                </div>


                <div className="tag_field" >
                    Tags :
                    <p className={`${styles.skeleton} ${styles.skeleton_text}`}>
                    </p>
                    <p className={`${styles.skeleton} ${styles.skeleton_text}`}>

                    </p>
                    <p className={`${styles.skeleton} ${styles.skeleton_text}`}>

                    </p>
                </div>
            </div>
        </>
    )
}
export default Post;
