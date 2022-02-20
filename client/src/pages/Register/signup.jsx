/**
 * This is a Register Page
 * This page is used for the registration of a user into BLogspoint
 */
//Third Party imports
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import swal from "sweetalert";
import GoogleLogin from "react-google-login";
//StyleSheets imports
import styles from "./signup.module.css";
//Local imports
import Register from "../../assest/svgs/Register/register.svg";
import {
  validateName,
  validateCity,
  validateState,
  validateStuProf,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateUsername,
} from "../../methods/Validators/validate";
import GoogleFormFillUp from "../../Components/GoogleFormFillUpModal/form";

const Signup = () => {
  //UseHistory Declarations
  const history = useHistory();
  //UseStates Declarations
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [googleDetails,_googleDetails]=useState({});;
  const [user, setUser] = useState({
    username: "",
    profilePic:"uploads/defaultpic.png",
    name: "",
    state: "",
    city: "",
    stuprof: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState({
    username: -1,
    name: -1,
    state: -1,
    city: -1,
    stuprof: -1,
    email: -1,
    password: -1,
    confirmpassword: -1,
  });
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    name: "",
    state: "",
    city: "",
    stuprof: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [open,_open]=useState(false);
  const userData=JSON.parse(localStorage.getItem("userLogin"))
  //Function to get the fields of register and provide validation
  const handleInputs = (e) => {
    const { name, value } = e.target;

    var isValid;
    setUser({ ...user, [name]: value });
    if (name === "username") {
      isValid = validateUsername(value);
    } else if (name === "name") isValid = validateName(value);
    else if (name === "city") {
      isValid = validateCity(value);
    } else if (name === "state") {
      isValid = validateState(value, user.city);
    } else if (name === "stuprof") {
      isValid = validateStuProf(value);
    } else if (name === "email") {
      isValid = validateEmail(value);
    } else if (name === "password") {
      isValid = validatePassword(value);
    } else {
      isValid = validateConfirmPassword(value, user.password);
    }

    if (value.length === 0) {
      setError({ ...error, [name]: -1 });
      setErrorMessage({ ...errorMessage, [name]: "" });
    } else if (!isValid[0]) {
      setError({ ...error, [name]: 1 });
      setErrorMessage({ ...errorMessage, [name]: isValid[1] });
    } else {
      setError({ ...error, [name]: 0 });
      setErrorMessage({ ...errorMessage, [name]: "" });
    }
  };

  //Passing the registration details to backend
  const postData = async (e) => {
    //To prevent refreshing
    e.preventDefault();
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
    } = user;

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
  //Show or Hide password feature
  const toggleEyes1 = () => {
    if (showPassword1 === true) setShowPassword1(false);
    else setShowPassword1(true);
  };
  //Show or hide confirm password feature
  const toggleEyes2 = () => {
    if (showPassword2 === true) setShowPassword2(false);
    else setShowPassword2(true);
  };
  const googleSuccess=(req)=>{
    console.log(req?.profileObj)
    console.log("Success");
    _googleDetails((prev)=>prev=req?.profileObj);
    onOpenModal();
  }
  const googleError=(err)=>{
    console.log(err)
    console.log("Error")
  }
  //Function to change the state of open
  const onOpenModal=()=>{
    _open((prev)=>(prev=true))
  }
  const onCLoseModal=()=>{
    _open((prev)=>(prev=false));
  }
  //UseEffect Declarations
  useEffect(() => {
    document.title = "Signup Page - Blogspoint";
  }, []);
  if(userData!==null)history.push("/")
  return (
    <>
      <ToastContainer />
      <div className={`${styles.container_login}`}>
        <div className={`${styles.form_outer}`}>
          <div className={`${styles.form_inner}`}>
            <p className={`${styles.reg}`}>Register</p>
            <div className={`${styles.formpng}`}>
              <div className={`${styles.form_inner_inner}`}>
              <GoogleLogin
            clientId="569525130247-sb80g53ts1n9coh360bnlna8cddh1ke5.apps.googleusercontent.com"
            render={(renderProps) => (
              <button className={styles.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}  variant="contained">
                Sign Up With Google
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
           <p style={{textAlign:"center"}}>OR</p>
                <form action="login" method="POST" onSubmit={postData}>
                  <div className={`${styles.form_row}`}>
                    <i
                      className={`fa fa-user ${styles.fa_user}`}
                      aria-hidden="true"
                    ></i>
                    <div className={`${styles.form_name}`}>
                      {/* Username */}
                      <div className={`${styles.col}`}>
                        <input
                          type="text"
                          className={`${styles.form_control}`}
                          value={user.username}
                          onChange={handleInputs}
                          placeholder="Enter your username"
                          name="username"
                          autoComplete="off"
                          required
                        />
                        {error.username === 1 && (
                          <i
                            class="fas fa-exclamation-circle"
                            style={{ color: "#f60000" }}
                          ></i>
                        )}
                        {error.username === 0 && (
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "var(--correct-answer)" }}
                          ></i>
                        )}
                      </div>
                      {error.username === 1 && (
                        <div className={`${styles.errorMessage}`}>
                          {errorMessage.username}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i
                      className={`fa fa-user ${styles.fa_user}`}
                      aria-hidden="true"
                    ></i>
                    <div className={`${styles.form_name}`}>
                      {/* Name */}
                      <div className={`${styles.col}`}>
                        <input
                          type="text"
                          className={`${styles.form_control}`}
                          value={user.name}
                          onChange={handleInputs}
                          placeholder="Enter your name"
                          name="name"
                          autoComplete="off"
                          required
                        />
                        {error.name === 1 && (
                          <i
                            class="fas fa-exclamation-circle"
                            style={{ color: "#f60000" }}
                          ></i>
                        )}
                        {error.name === 0 && (
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "var(--correct-answer)" }}
                          ></i>
                        )}
                      </div>
                      {error.name === 1 && (
                        <div className={`${styles.errorMessage}`}>
                          {errorMessage.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i class="fas fa-city"></i>
                    <div className={`${styles.form_name}`}>
                      {/* City */}
                      <div className={`${styles.col}`}>
                        <input
                          type="text"
                          className={`${styles.form_control}`}
                          value={user.city}
                          onChange={handleInputs}
                          placeholder="Enter your city name"
                          name="city"
                          autoComplete="off"
                          required
                        />
                        {error.city === 1 && (
                          <i
                            class="fas fa-exclamation-circle"
                            style={{ color: "#f60000" }}
                          ></i>
                        )}
                        {error.city === 0 && (
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "var(--correct-answer)" }}
                          ></i>
                        )}
                      </div>

                      {error.city === 1 && (
                        <div className={`${styles.errorMessage}`}>
                          {errorMessage.city}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i class="fas fa-city"></i>
                    <div className={`${styles.form_name}`}>
                      {/* State */}
                      <div className={`${styles.col}`}>
                        <input
                          type="text"
                          className={`${styles.form_control}`}
                          value={user.state}
                          onChange={handleInputs}
                          placeholder="Enter your state"
                          name="state"
                          autoComplete="off"
                          required
                        />
                        {error.state === 1 && (
                          <i
                            class="fas fa-exclamation-circle"
                            style={{ color: "#f60000" }}
                          ></i>
                        )}
                        {error.state === 0 && (
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "var(--correct-answer)" }}
                          ></i>
                        )}
                      </div>
                      {error.state === 1 && (
                        <div className={`${styles.errorMessage}`}>
                          {errorMessage.state}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i
                      className={`fa fa-user ${styles.fa_user}`}
                      aria-hidden="true"
                    ></i>
                    <div className={`${styles.form_name}`}>
                      {/* Student / Professional */}
                      <div className={`${styles.col}`}>
                        <input
                          type="text"
                          className={`${styles.form_control}`}
                          value={user.stuprof}
                          onChange={handleInputs}
                          placeholder="Are you a student or Professional ?"
                          name="stuprof"
                          autoComplete="off"
                          required
                        />
                        {error.stuprof === 1 && (
                          <i
                            class="fas fa-exclamation-circle"
                            style={{ color: "#f60000" }}
                          ></i>
                        )}
                        {error.stuprof === 0 && (
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "var(--correct-answer)" }}
                          ></i>
                        )}
                      </div>
                      {error.stuprof === 1 && (
                        <div className={`${styles.errorMessage}`}>
                          {errorMessage.stuprof}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i class="fas fa-envelope"></i>
                    <div className={`${styles.form_name}`}>
                      {/* Email */}
                      <div className={`${styles.col}`}>
                        <input
                          type="email"
                          className={`${styles.form_control}`}
                          value={user.email}
                          onChange={handleInputs}
                          placeholder="Enter your email"
                          name="email"
                          autoComplete="off"
                        />
                        {error.email === 1 && (
                          <i
                            class="fas fa-exclamation-circle"
                            style={{ color: "#f60000" }}
                          ></i>
                        )}
                        {error.email === 0 && (
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "var(--correct-answer)" }}
                          ></i>
                        )}
                      </div>
                      {error.email === 1 && (
                        <div className={`${styles.errorMessage}`}>
                          {errorMessage.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i
                      className={`fa fa-lock ${styles.fa_lock}`}
                      aria-hidden="true"
                    ></i>
                    <div className={`${styles.form_name}`}>
                      {/* Password */}
                      <div className={`${styles.col}`}>
                        <input
                          type={showPassword1 === true ? "text" : "password"}
                          className={`${styles.form_control}`}
                          value={user.password}
                          pattern="[A-Za-Z0-9]{7,}"
                          title="Password must start with a captital "
                          onChange={handleInputs}
                          placeholder="Enter your password"
                          name="password"
                          required
                        />
                        {error.password === 1 && (
                          <i
                            class="fas fa-exclamation-circle"
                            style={{ color: "#f60000" }}
                          ></i>
                        )}
                        {error.password === 0 && (
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "var(--correct-answer)" }}
                          ></i>
                        )}
                        {showPassword1 === true ? (
                          <BsEyeSlashFill
                            className={`${styles.close_eyes}`}
                            onClick={() => toggleEyes1()}
                          />
                        ) : (
                          <BsEyeFill
                            className={`${styles.open_eyes}`}
                            onClick={() => toggleEyes1()}
                          />
                        )}
                      </div>
                      {error.password === 1 && (
                        <div className={`${styles.errorMessage}`}>
                          {errorMessage.password}
                        </div>
                      )}
                      <div className={`${styles.form_name}`}></div>
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i
                      className={`fa fa-lock ${styles.fa_lock}`}
                      aria-hidden="true"
                    ></i>
                    <div className={`${styles.form_name}`}>
                      {/* Confirm Password */}
                      <div className={`${styles.col}`}>
                        <input
                          type={showPassword2 === true ? "text" : "password"}
                          className={`${styles.form_control}`}
                          value={user.confirmpassword}
                          onChange={handleInputs}
                          pattern="[A-Za-Z0-9]{7,}"
                          title="Password must start with a captital "
                          placeholder="Confirm your password"
                          name="confirmpassword"
                          required
                        />
                        {error.confirmpassword === 1 && (
                          <i
                            class="fas fa-exclamation-circle"
                            style={{ color: "#f60000" }}
                          ></i>
                        )}
                        {error.confirmpassword === 0 && (
                          <i
                            class="fas fa-check-circle"
                            style={{ color: "var(--correct-answer)" }}
                          ></i>
                        )}
                        {showPassword2 === true ? (
                          <BsEyeSlashFill
                            className={`${styles.close_eyes}`}
                            onClick={() => toggleEyes2()}
                          />
                        ) : (
                          <BsEyeFill
                            className={`${styles.open_eyes}`}
                            onClick={() => toggleEyes2()}
                          />
                        )}
                      </div>
                      {error.confirmpassword === 1 && (
                        <div className={`${styles.errorMessage}`}>
                          {errorMessage.confirmpassword}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Register */}
                  <div className={`${styles.btner}`}>
                    <input
                      type="submit"
                      className={`btn btn-success ${styles.login}`}
                      value="Register"
                    />
                  </div>
                </form>
              </div>
              {/* Section for already Login User */}
              <div className={`${styles.form_inner_inner}`}>
                <img src={Register} alt="register_pic"/>
                <div className={`${styles.has_account}`}>
                  Already have an account ?
                  <Link
                    style={{ marginLeft: "14px", cursor: "pointer" }}
                    to="/signin"
                  >
                    Signin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoogleFormFillUp open={open} onCLoseModal={onCLoseModal} user={googleDetails} />
    </>
  );
};
export default Signup;
