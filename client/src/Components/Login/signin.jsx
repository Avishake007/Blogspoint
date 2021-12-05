/*
  This is a Login Page
  Here we check whether a particular user is authenticate or not
*/
import React, { useContext, useEffect, useState } from 'react';

//CSS of Login Page
import styles from './login.module.css';

import { validateEmail, validatePassword } from "../Validators/validate";
import loginSvg from './login.png';
import { Link, useHistory } from "react-router-dom";

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import swal from "sweetalert";
import Loader from '../Loader/loader';


import { UserContext } from "../../App"
const Login = () => {

  const { state, dispatch } = useContext(UserContext);
  console.log(state)
  const history = useHistory();
 
  const [loader, setLoader] = useState(true);
  const [userLogin, setuserLogin] = useState({ email: '', password: '' })
  const [error,setError]=useState({
    email:-1,
    password:-1
  })
  const [errorMessage,setErrorMessage]=useState({
    email:"",
    password:""
  })
  const handleInputs = (e) => {
    const {name,value}=e.target;
   
   
    var isValid;
    setuserLogin({ ...userLogin, [name]: value });
    if (name === "email") {
      isValid = validateEmail(value);
    }
    else if (name === "password") {
      isValid = validatePassword(value);
    }
   
   

    if (value.length === 0) {
      setError({...error,[name]:-1});
      setErrorMessage({...errorMessage,[name]:""});
    }
    else if (!isValid[0]) {
      setError({...error,[name]:1});
      setErrorMessage({...errorMessage,[name]:isValid[1]});

    }
    else {
      setError({...error,[name]:0});
      setErrorMessage({...errorMessage,[name]:""});
    }


  }

  const validateLogin = async (e) => {
    e.preventDefault();
    var email=userLogin.email;
    var password=userLogin.password
    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      setTimeout(
        swal("Login failed", "Invalid Credentials ", "error")
        , 10000);
      // setTimeout(toast.error("",{
      //   position: "top-center",
      // }),3000);
    }
    else if (email === "" || password === "") {
      setTimeout(toast.error("Please fill the required fields", {
        position: "top-center",
      }), 3000);
    }
    else {
      dispatch({ type: 'USER', payload: true })
      swal("Welcome!", "Login Successful", "success");
      await sleep(3000);
      history.push('/');
    }
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  useEffect(() => {
    document.title = "Signin Page - Blogspoint";
    setLoader(false);
  }, [])
  if (loader)
    return <Loader />

  return (
    <>
      <ToastContainer />
      <div className={`${styles.container_login}`}>
        <div className={`${styles.form_outer}`}>
          <div className={`${styles.form_inner}`}>
            <p className={`${styles.reg}`}>Login</p>
            <div className={`${styles.formpng}`}>
              <div className={`${styles.form_inner_inner}`}>
                <form action="login" method="POST">
                  <div className={`${styles.form_row}`}>
                    <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
                    <div className={`${styles.form_name}`} id="email">
                    <div className={`${styles.col}`}>
                      <input type="email" className={`${styles.form_control}`}
                        value={userLogin.email}
                        onChange={handleInputs}
                        autoComplete="off"
                        placeholder="Enter your email" name="email" />
                         {error.email===1&&<i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>}
                      {error.email===0&&<i class="fas fa-check-circle" style={{color:"#005f00"}}></i>}
                    </div>
                    {error.email===1&&<div className="errorMessage" >{errorMessage.email}</div>}  
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i className={`fa fa-lock ${styles.fa_lock}`} aria-hidden="true"></i>
                    <div className={`${styles.form_name}`} id="password">
                    <div className={`${styles.col}`}>
                      <input type="password" className={`${styles.form_control}`}
                        value={userLogin.password}
                        onChange={handleInputs}
                        placeholder="Enter your password" name="password" />
                       {error.password===1&&<i class="fas fa-exclamation-circle" style={{color:"#f60000"}}></i>}
                      {error.password===0&&<i class="fas fa-check-circle" style={{color:"#005f00"}}></i>}
                    </div>
                    {error.password===1&&<div className="errorMessage" >{errorMessage.password}</div>}  
                    </div>
                  </div>
                  <div className={`${styles.form_check}`}>
                    <input type="checkbox" className={`${styles.form_check_input}`} id="exampleCheck1" />
                    <label className={`${styles.form_check_label}`} htmlFor="exampleCheck1">Remember Me</label>
                  </div>
                  <div className={`${styles.btner}`}>
                    <button type="submit" className={`btn btn-success ${styles.login}`}
                      onClick={validateLogin}
                    >LogIn
                    </button>
                    
                  </div>

                </form>
                <div className={`${styles.no_account}`}>
                      Don't have an account ?
                      <Link style={{ marginLeft: "14px", cursor: "pointer" }} to="/signup">
                        Register
                      </Link>
                    </div>
              </div>
              <div className={`${styles.form_inner_inner}`}>
                <img className={`${styles.login_png}`} src={loginSvg} alt="login_photo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login;