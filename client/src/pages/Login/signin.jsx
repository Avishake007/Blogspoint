/*
  This is a Login Page
  Here we check whether a particular user is authenticate or not
*/
//Third Party import
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
//StyleSheet import
import styles from "./login.module.css";
//Local imports
import {
  validateEmail,
  validatePassword,
} from "../../methods/Validators/validate";
import loginSvg from "../../assest/images/login.png";
import { Link, useHistory } from "react-router-dom";
import Loader from "../../Components/Loader/loader";
import { UserContext } from "../../App";
const Login = () => {
  //UseContext Declarations
  const { state, dispatch } = useContext(UserContext);
  //UseHistory Declarations
  const history = useHistory();
  //UseStates Declarations
  const [loader, setLoader] = useState(true);
  const [userLogin, setuserLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    email: -1,
    password: -1,
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  //Function to get the email and password field and provide validation
  const handleInputs = (e) => {
    const { name, value } = e.target;
    var isValid;
    setuserLogin({ ...userLogin, [name]: value });
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
  //Logins the registered user
  const validateLogin = async (e) => {
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
      swal("Welcome!", "Login Successful", "success");
      await sleep(3000);
      history.push("/");
    }
  };
  //Provides delay for ms milliseconds
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //UseEffect Declaration
  useEffect(() => {
    document.title = "Signin Page - Blogspoint";
    setLoader(false);
  }, []);
  //Loader Functionality
  if (loader) return <Loader />;

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
                            style={{ color: "#005f00" }}
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
                            style={{ color: "#005f00" }}
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
                      onClick={validateLogin}
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
