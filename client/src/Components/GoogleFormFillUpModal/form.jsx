import React, { useState } from 'react'
import { useEffect } from 'react';
import Modal from 'react-responsive-modal'
import { cityApi } from '../../methods/Api/api';
import '../../styles/responsive_modal.css';
import styles from "./form.module.css";
const GoogleFormFillUp = ({open,onCLoseModal,user}) => {
    const [userData,_userData]=useState({
        username: "",
        profilePic:user?.imageUrl,
        name: user?.name,
        state: "",
        city: "",
        stuprof: "",
        email: user?.email,
        password: "",
        confirmpassword: "",
      });
      const [states,_states]=useState([])
      const [cities,_cities]=useState({})
    const passwordGenerator=()=>{
        var pass = 'Aa1@';
            var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                    'abcdefghijklmnopqrstuvwxyz0123456789@#$';
              
            for (var i = 1; i <= 8; i++) {
                var char = Math.floor(Math.random()
                            * str.length + 1);
                  
                pass += str.charAt(char)
            }
            return pass;
    }
    const handleInputs=(e)=>{
        var name=e.target.name;
        var value=e.target.value;
        _userData({...userData,[name]:value})
    }
    useEffect(()=>{
        var password=passwordGenerator();
        _userData({..._userData,"password":password,"confirmpassword":password});
        var cityStates=cityApi();
        var stateArr=new Array();
        var cityObj={};
        console.log(cityStates)
        for(var i=0;i<cityStates.length;i++){
            if(!stateArr.includes(cityStates[i].state))
            stateArr.push(cityStates[i].state)
            cityObj[cityStates[i].state].push(cityStates[i].name)
        }
        for(var i=0;i<cityStates.length;i++){
            
        }
        console.log(stateArr)
       _states(stateArr.sort())
    },[])
  return (
    <Modal open={open} onClose={onCLoseModal} center >
       <form action="" method="post">
            <div >
                <label>Username</label>
                <input
                          type="text"
                          className={styles.form_control}
                          value={userData.city}
                          onChange={handleInputs}
                          placeholder="Enter your city name"
                          name="city"
                          autoComplete="off"
                          required
                        />
            </div>
            <div>

                <label for="states">Choose a car:</label>
  <select name="states" id="states">
  <option value="Select">Select your state</option>
      {
          states?.map((val,key)=>(
    <option value={val}>{val}</option>
          ))}
  </select>
            </div>
       </form>
  </Modal>
  )
}

export default GoogleFormFillUp