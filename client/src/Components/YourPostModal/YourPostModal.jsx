import React from 'react'
import Modal from 'react-responsive-modal'
import '../../styles/responsive_modal.css';
import Post from '../Post/post';
import styles from "./yourPostModal.module.css";
const YourPostModal = ({open,onCLoseModal,posts}) => {
  return (
    <Modal open={open} onClose={onCLoseModal} center >
        <div className={`${styles.tags_modal}`}>
            {
                 posts?.map((post, _) => (
                    <Post post={post} key={_} authenticate={true} />
                  ))
            }
        </div>
        <div className={`${styles.shady}`}></div>
  </Modal>
  )
}

export default YourPostModal