import React,{useState} from 'react';
import styles from './signup.module.css';
import Registersvg from './register.jsx';
import {useHistory} from 'react-router-dom';
const Signup=()=>{
  const history=useHistory();
  const [user,setUser]=useState({
    username:'',name:'',state:'',city:'',stuprof:'',email:'',password:'',confirmpassword:''
  });
  let name,value;
  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  };
  const postData=async (e)=> {
    e.preventDefault();
    const {username,name,state,city,stuprof,email,password,confirmpassword}=user;
    // if(password===confirmpassword){
    const res=await fetch('/signup',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username,name,state,city,stuprof,email,password,confirmpassword
      })
    });
    const data=await res.json();
    if(data.status===422||!data){
      window.alert("Invalid Registration");
    }else{
      window.alert("Successful Registration");
      history.push('/signin')
    }
    // }
    // else
    // alert("Password did not match");
  }
    return(
      <div className={`${styles.container_login}`}>
      <div className={`${styles.form_outer}`}>
     <div className={`${styles.form_inner}`}>
       <p className={`${styles.reg}`}>Register</p>
       <div className={`${styles.formpng}`}>
       <div className={`${styles.form_inner_inner}`}>
   <form action="login" method="POST"> 
   <div className={`${styles.form_row}`}>
     <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
   
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
     value={user.username}
     onChange={handleInputs}
     placeholder="Enter your username" name="username" autoComplete="off"/>
   </div> 
   <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
   
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.name}
   onChange={handleInputs}
     placeholder="Enter your name" name="name" autoComplete="off"/>
   </div> 
 </div>
 <div className={`${styles.form_row}`}>
 <i class="fas fa-city"></i>
   
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.city}
   onChange={handleInputs}
     placeholder="Enter your city name" name="city" autoComplete="off"/>
   </div>
   <i class="fas fa-city"></i>
   
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.state}
   onChange={handleInputs}
     placeholder="Enter your state" name="state" autoComplete="off"/>
   </div>  
 </div>
 <div className={`${styles.form_row}`}>
     <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
   
     <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.stuprof}
   onChange={handleInputs}
     placeholder="Are you a student or Professional ?" name="stuprof" autoComplete="off"/>
   </div>  
 </div>
 <div className={`${styles.form_row}`}>
 <i class="fas fa-envelope"></i>
   
   <div className={`${styles.col}`}>
     <input type="email" className={`${styles.form_control}`}
   value={user.email}
   onChange={handleInputs}
     placeholder="Enter your email" name="email" autoComplete="off"/>
   </div> 
 </div>
   <div className={`${styles.form_row}`}>
       <i className={`fa fa-lock ${styles.fa_lock}`} aria-hidden="true"></i>
 <div className={`${styles.col}`}>
     <input type="password" className={`${styles.form_control}`} 
  value={user.password}
  onChange={handleInputs}
     placeholder="Enter your password" name="password"/>
   </div>
   <i className={`fa fa-lock ${styles.fa_lock}`} aria-hidden="true"></i>
 <div className={`${styles.col}`}>
     <input type="password" className={`${styles.form_control}`} 
   value={user.confirmpassword}
   onChange={handleInputs}
     placeholder="Confirm your password" name="confirmpassword"/>
   </div>
   </div>
 <div className={`${styles.btner}`}>
 <button type="submit" className={`btn btn-danger ${styles.login}`}
  onClick={postData}
 >Register</button>
</div>
 </form>
 </div>
 <div className={`${styles.form_inner_inner}`}>
   <Registersvg/>
   </div>
   </div>
 </div>
 </div>
 </div>
    
      )
}
export default Signup;