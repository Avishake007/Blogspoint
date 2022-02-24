import React, { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal'
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { cityApi } from '../../methods/Api/api';
import { updateUserInformation } from '../../methods/crud/user';
import '../../styles/responsive_modal.css';
import Spinner from '../Spinner/spin';
import styles from "./updateUserDetails.module.css";
const UpdateUserDetails = ({open,onCLoseModal,user}) => {
    const [userData, _userData] = useState(user);
      const [states, _states] = useState([]);
      const [cities, _cities] = useState([]);
     const [update,_update]=useState(false);
      const handleInputs = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        
        if(name==="state"){
            var arr=new Array();
            var cityStates = cityApi();
            for(var i=0;i<cityStates.length;i++){
                if(cityStates[i].state===value)
                arr.push(cityStates[i].name)
            }
            console.log(arr)
            _userData({ ...userData, [name]: value ,"city":"Select"});
            _cities(arr.sort());
        }
        else
        _userData({ ...userData, [name]: value });
      };
       //Providing delay for ms milliseconds
   function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
      //Passing the registration details to backend
      const postData = async (e) => {
        e.preventDefault();
        if (userData?.name&&userData?.state!=="Select"&&userData?.city!=="Select"&&userData?.stuprof!=="Select") {
          _update(true);
          await updateUserInformation(user?._id,userData);
          swal("", "userData updated successfully", "success");
          sleep(3000);
          onCLoseModal();
          _update(false);
        } else {
          if(!userData?.name||userData?.state==="Select"||userData?.city==="Select"||userData?.stuprof==="Select")
          setTimeout(
            toast.error("Please fill up all the fields", {
              position: "top-center",
            }),
            3000
          );
          else
          setTimeout(
            toast.error("Original and Updated userData should be different", {
              position: "top-center",
            }),
            3000
          );
        }
      };
      useEffect(() => {
      
        // _userData({ ..._userData,   state:"Select",profilePic: "uploads/defaultpic.png",name:user?.name,email:user?.email,password: password, confirmpassword: password });
        var cityStates = cityApi();
        var stateArr = new Array();
        // console.log(cityStates);
        for (var i = 0; i < cityStates.length; i++) {
          if (!stateArr.includes(cityStates[i].state))
            stateArr.push(cityStates[i].state);
        }
        var arr=new Array();
        var cityStates = cityApi();
        for(var i=0;i<cityStates.length;i++){
            if(cityStates[i].state===userData?.state)
            arr.push(cityStates[i].name)
        }
        console.log(arr)
        _cities(arr.sort());
        
        _states(stateArr.sort());
        // _cities(cityObj)
      }, [open]);
      return (
        <Modal open={open} onClose={onCLoseModal} center>
          <form action="" method="post" className={styles.form}>
            <div className={styles.text}>Please Fill Up this Form...</div>
          <div>
              <label for="email">Email :</label>
              <input
                type="text"
                className={styles.form_control}
                style={{cursor:"not-allowed"}}
                value={userData?.email}
                name="email"
                disabled
                required
              />
            </div>
            <div>
              <label for="username">Username :</label>
              <input
                type="text"
                className={styles.form_control}
                value={userData?.username}
                style={{cursor:"not-allowed"}}
                onChange={handleInputs}
                placeholder="Enter your username"
                name="username"
                autoComplete="off"
                disabled
                required
              />
            </div>
            <div>
              <label for="name">Name :</label>
              <input
                type="text"
                className={styles.form_control}
                value={userData?.name}
                onChange={handleInputs}
                placeholder="Enter your Name"
                name="name"
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label for="state">State  : </label>
              <select name="state" id="state" 
              className={styles.form_control}
              onChange={handleInputs}
              value={userData?.state}
              >
                <option value="Select">Select your state</option>
                {states?.map((val, key) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
            </div>
            <div>
              <label for="city">City  : </label>
              <select name="city" id="city" className={styles.form_control} onChange={handleInputs}
             value={userData?.city}
              >
                
                <option value="Select">Select Your City</option>
                {userData?.state!=="Select"&&cities?.map((val, key) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
            </div>
            <div>
              <label for="stuprof">Designation  : </label>
              <select name="stuprof" id="stuprof" className={styles.form_control} onChange={handleInputs}
              value={userData?.stuprof}
              >
              <option value="Select">Select Your Designation</option>
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
              <div type="submit" value="Submit" className={styles.submit} onClick={postData}>
              {update?<div style={{display:"flex",width:""}}>Updating <Spinner/></div>:"Update"}
              </div>
          </form>
        </Modal>
  )
}

export default UpdateUserDetails