import React,{useEffect, useState} from 'react';
import styles from './signup.module.css';
import Registersvg from './register.jsx';
//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TiTick } from 'react-icons/ti'
import { VscChromeClose } from 'react-icons/vsc';
import {Link,useHistory} from 'react-router-dom';
const Signup=()=>{
  const history=useHistory();
  const  [format,setFormat]=useState(false);
  const [confirmPassword,setConfirmpassword]=useState(false);
  const [user,setUser]=useState({
    username:'',name:'',state:'',city:'',stuprof:'',email:'',password:'',confirmpassword:''
  });

 
  let name,value;
  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  };

  const handlePassword=(e)=>{
      handleInputs(e);
      value=e.target.value;
      var isLower=0;
      var isDigit=0;
      for(var i=0;i<value.length;i++){
        if(value[i].toLowerCase()===value[i]&&!Number.isInteger(parseInt(value[i])))
        isLower=1;
        if(Number.isInteger(parseInt(value[i])))
        isDigit=1;
      }
      if(value.length>0)
      if(value.length>=8&&(value[0].toUpperCase()==value[0]&&!Number.isInteger(parseInt(value[0])))&&isDigit===1&&isLower===1)
      {
        setFormat(true);
      }
      else
      setFormat(false);
      

  };

  const handleConfirmPassword=(e)=>{
      handleInputs(e);
      if(e.target.value===user.password&&format===true)
      setConfirmpassword(true);
      else
      setConfirmpassword(false);
  }

  //Passing the registration details to backend
  const postData=async (e)=> {

    //To prevent refreshing
    e.preventDefault();

    //Object DeStructuring
    const {username,name,state,city,stuprof,email,password,confirmpassword}=user;

    
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
    console.log(res);
    console.log(data);
    if(format==false||confirmPassword===false)
    setTimeout(toast.error("Password must start with a capital letter, should contain atleast one lower case letter and one digit",{
      position: "top-center",
    }),3000);
    else if(res.status===422||!data){
      setTimeout(toast.error("Invalid Registration : "+data.error,{
        position: "top-center",
      }),3000);
    }else{
      setTimeout(toast.success("Successful Registration",{
        position: "top-center",
      }),3000);
      history.push('/signin')
    }
    // }
    // else
    // alert("Password did not match");
  }
    useEffect(()=>{
        document.title="Signup Page";
    },[])
    return(
      <>
      <ToastContainer/>
      <div className={`${styles.container_login}`}>
      <div className={`${styles.form_outer}`}>
     <div className={`${styles.form_inner}`}>
       <p className={`${styles.reg}`}>Register</p>
       <div className={`${styles.formpng}`}>
       <div className={`${styles.form_inner_inner}`}>
   <form action="login" method="POST" onSubmit={postData}> 
   <div className={`${styles.form_row}`}>
     <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
   
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
     value={user.username}
     onChange={handleInputs}
     placeholder="Enter your username" name="username" autoComplete="off" required/>
   </div> 
   <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
   
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.name}
   onChange={handleInputs}
     placeholder="Enter your name" name="name" autoComplete="off" required/>
   </div> 
 </div>
 <div className={`${styles.form_row}`}>
 <i class="fas fa-city"></i>
   
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.city}
   onChange={handleInputs}
     placeholder="Enter your city name" name="city" autoComplete="off" required/>
   </div>
   <i class="fas fa-city"></i>
   
   <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.state}
   onChange={handleInputs}
     placeholder="Enter your state" name="state" autoComplete="off" required/>
   </div>  
 </div>
 <div className={`${styles.form_row}`}>
     <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
   
     <div className={`${styles.col}`}>
     <input type="text" className={`${styles.form_control}`}
   value={user.stuprof}
   onChange={handleInputs}
     placeholder="Are you a student or Professional ?" name="stuprof" autoComplete="off" required/>
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
  pattern='[A-Za-Z0-9]{7,}'
  title="Password must start with a captital "
  onChange={handlePassword}
     placeholder="Enter your password" name="password" required/>
     {
     (format===true)&&<div style={{fontSize: "15px",color:"green"}}><TiTick/></div>
      }
      {
     (format===false)&&<div style={{fontSize: "15px",color:"red"}}><VscChromeClose/></div>
      }
   </div>
   
   </div>
   <div className={`${styles.form_row}`}>
   <i className={`fa fa-lock ${styles.fa_lock}`} aria-hidden="true"></i>
 <div className={`${styles.col}`}>
     <input type="password" className={`${styles.form_control}`} 
   value={user.confirmpassword}
   onChange={handleConfirmPassword}
   pattern="[A-Za-Z0-9]{7,}"
   title="Password must start with a captital "
     placeholder="Confirm your password" name="confirmpassword" required/>
   </div>
   {
     (confirmPassword===true)&&<div style={{fontSize: "15px",color:"green"}}><TiTick/></div>
      }
      {
     (confirmPassword===false)&&<div style={{fontSize: "15px",color:"red"}}><VscChromeClose/></div>
      }
   </div>
 <div className={`${styles.btner}`}>
 <input type="submit" className={`btn btn-danger ${styles.login}`}
  
  value="Register"
 />
</div>
 </form>
 
 </div>
 <div className={`${styles.form_inner_inner}`}>
   <Registersvg/>
   <div className={`${styles.has_account}`}>
   Already have an account ?
   <Link style={{    marginLeft: "14px",cursor: "pointer"}} to="/signin">
    Signin
    </Link>
 </div>
   </div>
   
   </div>
 </div>
 </div>
 </div>
    </>
      )
}
export default Signup;