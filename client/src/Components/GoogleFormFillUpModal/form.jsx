import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-responsive-modal";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { cityApi } from "../../methods/Api/api";
import "../../styles/responsive_modal.css";
import styles from "./form.module.css";
const GoogleFormFillUp = ({ open, onCLoseModal, user }) => {
  const [userData, _userData] = useState({
    username: "",
    profilePic: "",
    name: user?.name,
    state: "Select",
    city: "",
    stuprof: "Student",
    email: user?.email,
    password: "",
    confirmpassword: "",
  });
  const [states, _states] = useState([]);
  const [cities, _cities] = useState([]);
  const history=useHistory();
  const passwordGenerator = () => {
    var pass = "Aa1@";
    var str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (var i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    return pass;
  };
  const handleInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    _userData({ ...userData, [name]: value });
    if(name==="state"){
        var arr=new Array();
        var cityStates = cityApi();
        for(var i=0;i<cityStates.length;i++){
            if(cityStates[i].state===value)
            arr.push(cityStates[i].name)
        }
        console.log(arr)
        _cities(arr.sort());
    }
  };
  //Passing the registration details to backend
  const postData = async (e) => {
    //To prevent refreshing
    e.preventDefault();
    console.log(userData)
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    //Object DeStructuring
    const {
      username,
      profilePic,
      name,
      state,
      city,
      stuprof,
      email,
      password,
      confirmpassword,
    } = userData;

    const res = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        profilePic,
        name,
        state,
        city,
        stuprof,
        email,
        password,
        confirmpassword,
      }),
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      setTimeout(
        toast.error("Invalid Registration : " + data.error, {
          position: "top-center",
        }),
        3000
      );
    } else {
      swal(`Congrats ${name}`, "Registration successful", "success");
      await sleep(3000);
      history.push("/signin");
    }
  };
  useEffect(() => {
      console.log("User : ",user)
    var password = passwordGenerator();
    _userData({ ..._userData,   profilePic: "uploads/defaultpic.png",name:user?.name,email:user?.email,password: password, confirmpassword: password });
    var cityStates = cityApi();
    var stateArr = new Array();
    console.log(cityStates);
    for (var i = 0; i < cityStates.length; i++) {
      if (!stateArr.includes(cityStates[i].state))
        stateArr.push(cityStates[i].state);
    }

    
    _states(stateArr.sort());
    // _cities(cityObj)
  }, [open]);
  return (
    <Modal open={open} onClose={onCLoseModal} center>
      <form action="" method="post" className={styles.form}>
        <div className={styles.text}>Please Fill Up this Form...</div>
      <div>
          <label for="email">Email</label>
          <input
            type="text"
            className={styles.form_control}
            value={userData.email}
            name="email"
            disabled
            required
          />
        </div>
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            className={styles.form_control}
            value={userData.username}
            onChange={handleInputs}
            placeholder="Enter your username"
            name="username"
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label for="name">Name</label>
          <input
            type="text"
            className={styles.form_control}
            value={userData.name}
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
          onChange={handleInputs}>
            <option value="Select">Select your state</option>
            {states?.map((val, key) => (
              <option value={val}>{val}</option>
            ))}
          </select>
        </div>
        <div>
          <label for="city">City  : </label>
          <select name="city" id="city" className={styles.form_control} onChange={handleInputs}>
            {userData?.state==="Select"?<option value="Choose">Choose Your state first</option>:
            <option value="Select">Select Your city</option>}
            {cities?.map((val, key) => (
              <option value={val}>{val}</option>
            ))}
          </select>
        </div>
        <div>
          <label for="stuprof">Designation  : </label>
          <select name="stuprof" id="stuprof" className={styles.form_control} onChange={handleInputs}>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Submit" className={styles.submit} onClick={postData}/>
        </div>
      </form>
    </Modal>
  );
};

export default GoogleFormFillUp;
