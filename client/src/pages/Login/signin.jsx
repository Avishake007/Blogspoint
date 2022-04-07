/**
 * @Page SignIn Page
 * @Desc It log in's the user into the website
 */
//Third Party import
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { GoogleLogin } from "react-google-login";
//StyleSheet import
import styles from "./login.module.css";
//Local imports
import {
  validateEmail,
  validatePassword,
} from "../../methods/Validators/validate";
import loginSvg from "../../assest/images/login.png";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
const Login = () => {
  /**
   * @Context_Declaration
   */
  const { dispatch } = useContext(UserContext);
  /**
   * @History_Declaration
   */
  const history = useHistory();
  /**
   * @State_Declaration
   */
  /**
   * @State_Name userLogin
   * @Func It shows the user login details of a user
   * @Type Object
   */
  const [userLogin, setuserLogin] = useState({ email: "", password: "" });
  /**
   * @State_Name error
   * @Func Stores the presence of an error in a particular field
   * @Type Object
   */
  const [error, setError] = useState({
    email: -1,
    password: -1,
  });
  /**
   * @State_Name errorMessage
   * @Func Stores the error message of email and passord if it has error
   * @Type Object
   */
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  //Stores UserDetails in userData
  const userData = JSON.parse(localStorage.getItem("userLogin"));
  /**
   * @Function_Name validateUserDetails
   * @Desc Vaildates each field in the login form
   * @Return_Type void
   */
  const validateUserDetails = (name, value) => {
    var isValid;
    if (name === "email") {
      isValid = validateEmail(value);
    } else if (name === "password") {
      isValid = validatePassword(value);
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
  /**
   * @Function_Name handleInputs
   * @Desc Stores user login details in userLogin state
   * @Return_Type void
   */
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setuserLogin({ ...userLogin, [name]: value });
    validateUserDetails(name, value);
  };
  /**
   * @Function_Name sleep
   * @Desc Provides delay for ms milliseconds
   * @Return_Type Promise
   */
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  /**
   * @Function_Name siginInUser
   * @Desc It login's the regsitered user into the website
   * @Return_Type void
   */
  const signInUser = async (e) => {
    e.preventDefault();
    var email = userLogin.email;
    var password = userLogin.password;
    const res = await fetch("/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      setTimeout(swal("Login failed", "Invalid Credentials ", "error"), 10000);
    } else if (email === "" || password === "") {
      setTimeout(
        toast.error("Please fill the required fields", {
          position: "top-center",
        }),
        3000
      );
    } else {
      dispatch({ type: "USER", payload: true });
      localStorage.setItem("userLogin", JSON.stringify(true));
      swal("Welcome!", "Login Successful", "success");
      await sleep(3000);
      history.push("/welcomePage");
    }
  };
  /**
   * @Function_Name signInWithGoogle
   * @Desc Login's a registered user through google
   * @Return_Type void
   */
  const signInWithGoogle = async (userEmail) => {
    var email = userEmail;
    const res = await fetch("/user/google/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      setTimeout(swal("Login failed", "Invalid Credentials ", "error"), 10000);
    } else if (email === "") {
      setTimeout(
        toast.error("Please fill the required fields", {
          position: "top-center",
        }),
        3000
      );
    } else {
      dispatch({ type: "USER", payload: true });
      localStorage.setItem("userLogin", JSON.stringify(true));
      swal("Welcome!", "Login Successful", "success");
      await sleep(3000);
      history.push("/welcomePage");
    }
  };
  /**
   * @Function_Name googleSuccess
   * @Desc Calls the signWithGoogle function if google's signIn succeeds
   * @Return_Type void
   */
  const googleSuccess = (req) => {
    signInWithGoogle(req?.profileObj?.email);
  };
  /**
   * @Function_Name googleError
   * @Desc Shows error if signin's fails
   * @Return_Type void
   */
  const googleError = (err) => {
    alert(err);
  };

  /**
   * @UseEffect_Declaration
   */
  useEffect(() => {
    document.title = "Signin Page - Blogspoint";
  }, []);

  if (userData !== null) history.push("/about");
  return (
    <>
      <ToastContainer />
      <div className={`${styles.container_login}`}>
        <div className={`${styles.form_outer}`}>
          <div className={`${styles.form_inner}`}>
            <p className={`${styles.reg}`}>Login</p>
            <div className={`${styles.formpng}`}>
              <div className={`${styles.form_inner_inner}`}>
                {/* Login's to the website through Google */}
                <GoogleLogin
                  clientId="569525130247-sb80g53ts1n9coh360bnlna8cddh1ke5.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      className={styles.googleButton}
                      color="primary"
                      fullWidth
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      variant="contained"
                    >
                      Sign In With Google
                    </button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
                <p style={{ textAlign: "center" }}>OR</p>
                {/* Login's to the website by inputing details in login form */}
                <form action="login" method="POST">
                  <div className={`${styles.form_row}`}>
                    <i
                      className={`fa fa-user ${styles.fa_user}`}
                      aria-hidden="true"
                    ></i>
                    <div className={`${styles.form_name}`} id="email">
                      <div className={`${styles.col}`}>
                        {/* Email Field */}
                        <input
                          type="email"
                          className={`${styles.form_control}`}
                          value={userLogin.email}
                          onChange={handleInputs}
                          autoComplete="off"
                          placeholder="Enter your email"
                          name="email"
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
                        <div className="errorMessage">{errorMessage.email}</div>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.form_row}`}>
                    <i
                      className={`fa fa-lock ${styles.fa_lock}`}
                      aria-hidden="true"
                    ></i>
                    <div className={`${styles.form_name}`} id="password">
                      <div className={`${styles.col}`}>
                        {/* Password Field */}
                        <input
                          type="password"
                          className={`${styles.form_control}`}
                          value={userLogin.password}
                          onChange={handleInputs}
                          placeholder="Enter your password"
                          name="password"
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
                      </div>
                      {error.password === 1 && (
                        <div className="errorMessage">
                          {errorMessage.password}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.form_check}`}>
                    <input
                      type="checkbox"
                      className={`${styles.form_check_input}`}
                      id="exampleCheck1"
                    />
                    <label
                      className={`${styles.form_check_label}`}
                      htmlFor="exampleCheck1"
                    >
                      Remember Me
                    </label>
                  </div>
                  {/* Login Botton */}
                  <div className={`${styles.btner}`}>
                    <button
                      type="submit"
                      className={`btn btn-success ${styles.login}`}
                      onClick={signInUser}
                    >
                      LogIn
                    </button>
                  </div>
                </form>
                {/* User who don't have an account section */}
                <div className={`${styles.no_account}`}>
                  Don't have an account ?
                  <Link
                    style={{ marginLeft: "14px", cursor: "pointer" }}
                    to="/signup"
                  >
                    Register
                  </Link>
                </div>
              </div>
              <div className={`${styles.form_inner_inner}`}>
                <img
                  className={`${styles.login_png}`}
                  src={loginSvg}
                  alt="login_photo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
