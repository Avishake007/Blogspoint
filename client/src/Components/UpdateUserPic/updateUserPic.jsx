import React, { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { updateUserInfo } from '../../methods/crud/user';
import '../../styles/responsive_modal.css';
import Spinner from '../Spinner/spin';
import styles from "./updateUserPic.module.css";
const UpdateUserPic = ({open,onCLoseModal,user}) => {
    const [userData,_UserData]=useState(user);
    const [uploadedImg,_uploadedImg]=useState(null);
    const [selectedImg,_selectedImg]=useState(userData?.profilePic);
    const [update,_update]=useState(false);
    const imageUpload=(e)=>{
        _selectedImg(URL.createObjectURL(e.target.files[0]))
        _uploadedImg(e.target.files[0]);
        _UserData({...userData,"profilePic":URL.createObjectURL(e.target.files[0])})
        console.log(e.target.files[0])
      }
       //Providing delay for ms milliseconds
   function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
      const updateUserPic=async(e)=>{
        e.preventDefault();
        if(uploadedImg===null)
        setTimeout(
            toast.error("Please choose your pic", {
              position: "top-center",
            }),
            3000
          );
          else{
        const formData=new FormData();
        formData.append("profilePic",uploadedImg);
            _update(true)
          await updateUserInfo(userData?._id,formData,user);
          swal("", "Your Image updated successfully", "success");
          sleep(3000);
          onCLoseModal();
          _update(false);
          }
      }
      useEffect(()=>{
        _selectedImg(userData?.profilePic)
      },[userData])
  return (
    <Modal open={open} onClose={onCLoseModal} center >
            <div className={styles.update_img}>
                <img src={selectedImg} alt="" />
            <input type="file" name="profilePic" id="" onChange={imageUpload}  />
            <button onClick={updateUserPic}>{update?<div style={{display:"flex"}}>Uploading Your Image <Spinner/></div>:"Upload Your Image"}</button>
            </div>
            
  </Modal>
  )
}

export default UpdateUserPic