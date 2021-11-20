import React, { useEffect, useState } from 'react';
import styles from './signup.module.css';
import Registersvg from './register.jsx';
//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BsEyeFill,BsEyeSlashFill} from "react-icons/bs";
import swal from "sweetalert";
import { validateName, validateCity, validateState, validateStuProf, validateEmail, validatePassword, validateConfirmPassword, validateUsername } from '../Validators/validate';
import { Link, useHistory } from 'react-router-dom';
const Signup = () => {
  const history = useHistory();
  const [showPassword1,setShowPassword1]=useState(false);
  const [showPassword2,setShowPassword2]=useState(false);
  const [user, setUser] = useState({
    username: '', name: '', state: '', city: '', stuprof: '', email: '', password: '', confirmpassword: ''
  });
  const [error, setError] = useState({
    username: -1, name: -1, state: -1, city: -1, stuprof: -1, email: -1, password: -1, confirmpassword: -1
  })
  const [errorMessage, setErrorMessage] = useState({
    username: '', name: '', state: '', city: '', stuprof: '', email: '', password: '', confirmpassword: ''
  })

  //Handling Inputs

  const handleInputs = (e) => {
    const { name, value } = e.target;

    var isValid;
    setUser({ ...user, [name]: value });
    if (name === "username") {
      isValid = validateUsername(value);

    }
    else if(name==="name")
    isValid=validateName(value);
    else if (name === "city") {

      isValid = validateCity(value);
    }
    else if (name === "state") {

      isValid = validateState(value,user.city);
    }
    else if (name === "stuprof") {

      isValid = validateStuProf(value);
      // console.log(value);
    }
    else if (name === "email") {

      isValid = validateEmail(value);
    }
    else if (name === "password") {
      isValid = validatePassword(value);
    }
    else {

      isValid = validateConfirmPassword(value, user.password);
    }


    if (value.length === 0) {
      setError({ ...error, [name]: -1 });
      setErrorMessage({ ...errorMessage, [name]: "" });
    }
    else if (!isValid[0]) {
      setError({ ...error, [name]: 1 });
      setErrorMessage({ ...errorMessage, [name]: isValid[1] });

    }
    else {
      setError({ ...error, [name]: 0 });
      setErrorMessage({ ...errorMessage, [name]: "" });
    }

  };

  //Passing the registration details to backend
  const postData = async (e) => {

    //To prevent refreshing
    e.preventDefault();
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    //Object DeStructuring
    const { username, name, state, city, stuprof, email, password, confirmpassword } = user;


    const res = await fetch('/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, name, state, city, stuprof, email, password, confirmpassword
      })
    });
    const data = await res.json();
    console.log(res);
    console.log(data);

    if (res.status === 422 || !data) {
      setTimeout(toast.error("Invalid Registration : " + data.error, {
        position: "top-center",
      }), 3000);
    } else {
      swal("Congrats", "Registration successful", "success")
      await sleep(3000);
      history.push('/signin')
    }
    // }
    // else
    // alert("Password did not match");
  }
  const toggleEyes1=()=>{
    if(showPassword1===true)
    setShowPassword1(false);
    else
    setShowPassword1(true);
  }
  const toggleEyes2=()=>{
    if(showPassword2===true)
    setShowPassword2(false);
    else
    setShowPassword2(true);
  }
  useEffect(() => {
    document.title = "Signup Page";
  }, [])
  return (
    <>
      <ToastContainer />
      <div className={`${styles.container_login}`}>
        <div className={`${styles.form_outer}`}>
          <div className={`${styles.form_inner}`}>
            <p className={`${styles.reg}`}>Register</p>
            <div className={`${styles.formpng}`}>
              <div className={`${styles.form_inner_inner}`}>
                <form action="login" method="POST" onSubmit={postData}>
                  <div className={`${styles.form_row}`}>
                    <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
                    <div className={`${styles.form_name}`} >
                      <div className={`${styles.col}`}>
                        <input type="text" className={`${styles.form_control}`}
                          value={user.username}
                          onChange={handleInputs}
                          placeholder="Enter your username" name="username" autoComplete="off" required />
                        {error.username === 1 && <i class="fas fa-exclamation-circle" style={{ color: "#f60000" }}></i>}
                        {error.username === 0 && <i class="fas fa-check-circle" style={{ color: "#005f00" }}></i>}
                      </div>
                      {error.username === 1 && <div className={`${styles.errorMessage}`} >{errorMessage.username}</div>}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
                    <div className={`${styles.form_name}`} >
                      <div className={`${styles.col}`}>
                        <input type="text" className={`${styles.form_control}`}
                          value={user.name}
                          onChange={handleInputs}
                          placeholder="Enter your name" name="name" autoComplete="off" required />
                        {error.name === 1 && <i class="fas fa-exclamation-circle" style={{ color: "#f60000" }}></i>}
                        {error.name === 0 && <i class="fas fa-check-circle" style={{ color: "#005f00" }}></i>}
                      </div>
                      {error.name === 1 && <div className={`${styles.errorMessage}`} >{errorMessage.name}</div>}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i class="fas fa-city"></i>
                    <div className={`${styles.form_name}`} >
                      <div className={`${styles.col}`}>
                        <input type="text" className={`${styles.form_control}`}
                          value={user.city}
                          onChange={handleInputs}
                          placeholder="Enter your city name" name="city" autoComplete="off" required />
                        {error.city === 1 && <i class="fas fa-exclamation-circle" style={{ color: "#f60000" }}></i>}
                        {error.city === 0 && <i class="fas fa-check-circle" style={{ color: "#005f00" }}></i>}
                      </div>

                      {error.city === 1 && <div className={`${styles.errorMessage}`} >{errorMessage.city}</div>}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i class="fas fa-city"></i>
                    <div className={`${styles.form_name}`} >
                      <div className={`${styles.col}`}>
                        <input type="text" className={`${styles.form_control}`}
                          value={user.state}
                          onChange={handleInputs}
                          placeholder="Enter your state" name="state" autoComplete="off" required />
                        {error.state === 1 && <i class="fas fa-exclamation-circle" style={{ color: "#f60000" }}></i>}
                        {error.state === 0 && <i class="fas fa-check-circle" style={{ color: "#005f00" }}></i>}
                      </div>
                      {error.state === 1 && <div className={`${styles.errorMessage}`} >{errorMessage.state}</div>}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i className={`fa fa-user ${styles.fa_user}`} aria-hidden="true"></i>
                    <div className={`${styles.form_name}`} >
                      <div className={`${styles.col}`}>
                        <input type="text" className={`${styles.form_control}`}
                          value={user.stuprof}
                          onChange={handleInputs}
                          placeholder="Are you a student or Professional ?" name="stuprof" autoComplete="off" required />
                        {error.stuprof === 1 && <i class="fas fa-exclamation-circle" style={{ color: "#f60000" }}></i>}
                        {error.stuprof === 0 && <i class="fas fa-check-circle" style={{ color: "#005f00" }}></i>}
                      </div>
                      {error.stuprof === 1 && <div className={`${styles.errorMessage}`} >{errorMessage.stuprof}</div>}
                      
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i class="fas fa-envelope"></i>
                    <div className={`${styles.form_name}`} >
                      <div className={`${styles.col}`}>
                        <input type="email" className={`${styles.form_control}`}
                          value={user.email}
                          onChange={handleInputs}
                          placeholder="Enter your email" name="email" autoComplete="off" />
                        {error.email === 1 && <i class="fas fa-exclamation-circle" style={{ color: "#f60000" }}></i>}
                        {error.email === 0 && <i class="fas fa-check-circle" style={{ color: "#005f00" }}></i>}
                        
                      </div>
                      {error.email === 1 && <div className={`${styles.errorMessage}`} >{errorMessage.email}</div>}
                     
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i className={`fa fa-lock ${styles.fa_lock}`} aria-hidden="true"></i>
                    <div className={`${styles.form_name}`} >
                      <div className={`${styles.col}`}>
                        <input type={showPassword1===true?"text":"password"} className={`${styles.form_control}`}
                          value={user.password}
                          pattern='[A-Za-Z0-9]{7,}'
                          title="Password must start with a captital "
                          onChange={handleInputs}
                          placeholder="Enter your password" name="password" required />
                        {error.password === 1 && <i class="fas fa-exclamation-circle" style={{ color: "#f60000" }}></i>}
                        {error.password === 0 && <i class="fas fa-check-circle" style={{ color: "#005f00" }}></i>}
                        {showPassword1===true?<BsEyeSlashFill className={`${styles.close_eyes}`} onClick={()=>toggleEyes1()}/>:<BsEyeFill className={`${styles.open_eyes}`} onClick={()=>toggleEyes1()}/>}
                      </div>
                      {error.password === 1 && <div className={`${styles.errorMessage}`} >{errorMessage.password}</div>}
                      <div className={`${styles.form_name}`} ></div>
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i className={`fa fa-lock ${styles.fa_lock}`} aria-hidden="true"></i>
                    <div className={`${styles.form_name}`} >
                      <div className={`${styles.col}`}>
                        <input
                         type={showPassword2===true?"text":"password"} 
                         className={`${styles.form_control}`}
                          value={user.confirmpassword}
                          onChange={handleInputs}
                          pattern="[A-Za-Z0-9]{7,}"
                          title="Password must start with a captital "
                          placeholder="Confirm your password" name="confirmpassword" required />
                        {error.confirmpassword === 1 && <i class="fas fa-exclamation-circle" style={{ color: "#f60000" }}></i>}
                        {error.confirmpassword === 0 && <i class="fas fa-check-circle" style={{ color: "#005f00" }}></i>}
                        {showPassword2===true?<BsEyeSlashFill className={`${styles.close_eyes}`} onClick={()=>toggleEyes2()}/>:<BsEyeFill className={`${styles.open_eyes}`} onClick={()=>toggleEyes2()}/>}
                      </div>
                      {error.confirmpassword === 1 && <div className={`${styles.errorMessage}`} >{errorMessage.confirmpassword}</div>}
                    </div>
                  </div>
                  <div className={`${styles.btner}`}>
                    <input type="submit" className={`btn btn-danger ${styles.login}`}

                      value="Register"
                    />
                  </div>
                </form>

              </div>
              <div className={`${styles.form_inner_inner}`}>
                <Registersvg />
                <div className={`${styles.has_account}`}>
                  Already have an account ?
                  <Link style={{ marginLeft: "14px", cursor: "pointer" }} to="/signin">
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