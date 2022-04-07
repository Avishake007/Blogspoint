/**
 * @Page Register Page
 * @Desc This page is used for signing up or registering of new users
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
import { cityApi } from "../../methods/Api/api";

const Signup = () => {
  /**
   * @location_Declaration
   */
  const history = useHistory();
  /**
   * @State_Declaration
   */
  /**
   * @State_Name showPassword1
   * @Func Shows/Hides the password entered by the user
   * @Type Boolean
   */
  const [showPassword1, setShowPassword1] = useState(false);
  /**
   * @State_Name showPassword2
   * @Func Shows/Hides the confirm password entered by the user
   * @Type Boolean
   */
  const [showPassword2, setShowPassword2] = useState(false);
  /**
   * @State_Name googleDetails
   * @Func Stores the details of the user who has signed up through google
   * @Type Object
   */
  const [googleDetails, _googleDetails] = useState({});
  /**
   * @State_Name states
   * @Func Stores all the states from the state-city api
   * @Type Array
   */
  const [states, _states] = useState([]);
  /**
   * @State_Name cities
   * @Func Stores all the cities of a particular state
   * @Type Array
   */
  const [cities, _cities] = useState([]);
  /**
   * @State_Name user
   * @Func Stores the details of a user who has entered their details in register form
   * @Type Object
   */
  const [user, setUser] = useState({
    username: "",
    profilePic: "uploads/defaultpic.png",
    name: "",
    state: "Select",
    city: "",
    stuprof: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  /**
   * @State_Name error
   * @Func Stores the presence of an error for each individual field in the register form
   * @Type Object
   */
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
  /**
   * @State_Name errorMessage
   * @Func Stores the error message for each individual field in the register form provided an error has occurred in that field
   * @Type Object
   */
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
  /**
   * @State_Name open
   * @Func Opens/Closes the register form when a user signups with google
   * @Type Boolean
   */
  const [open, _open] = useState(false);
  //Stores the user Details in userData
  const userData = JSON.parse(localStorage.getItem("userLogin"));
  /**
   * @Function_Name validateUserDetails
   * @Desc It validates all the fields
   * @Return_Type void
   */
  const validateUserDetails = (name, value) => {
    var isValid;
    if (name === "state") {
      var arr = new Array();
      var cityStates = cityApi();
      for (var i = 0; i < cityStates.length; i++) {
        if (cityStates[i].state === value) arr.push(cityStates[i].name);
      }
      _cities(arr.sort());
    }
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
  /**
   * @Function_Name handleInputs
   * @Desc It stores the changes made in the fields to user satate
   * @Return_Type void
   */
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validateUserDetails(name, value);
  };

  /**
   * @Function_Name postData
   * @Desc Posting the user Details to mongodb via backend
   * @Return_Type void
   */
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
  /**
   * @Function_Name toggleEyes1
   * @Desc Toggles eyes of password field
   * @Return_Type void
   */
  const toggleEyes1 = () => {
    if (showPassword1 === true) setShowPassword1(false);
    else setShowPassword1(true);
  };
  /**
   * @Function_Name togglesEyes2
   * @Desc Toggles eyes of confirm password field
   * @Return_Type void
   */
  const toggleEyes2 = () => {
    if (showPassword2 === true) setShowPassword2(false);
    else setShowPassword2(true);
  };
  /**
   * @Function_Name googleSuccess
   * @Desc Stores the user details to googleDetails state and calls onOpeneModal function
   * @Return_Type void
   */
  const googleSuccess = (req) => {
    _googleDetails((prev) => (prev = req?.profileObj));
    onOpenModal();
  };
  /**
   * @Function_Name googleError
   * @Desc Alert the user about the error that has occured while signingup with google
   * @Return_Type void
   */
  const googleError = (err) => {
    alert(err);
  };
  /**
   * @Function_Name onOpenModal
   * @Desc It opens the register form modal
   * @Return_Type void
   */
  const onOpenModal = () => {
    _open((prev) => (prev = true));
  };
  /**
   * @Function_Name onCloseModal
   * @Desc It closes the register form modal
   * @Return_Type void
   */
  const onCLoseModal = () => {
    _open((prev) => (prev = false));
  };
  /**
   * @UseEffect_Declaration
   */
  useEffect(() => {
    document.title = "Signup Page - Blogspoint";
    setUser({ ...user, state: "Select" });
    var cityStates = cityApi();
    var stateArr = new Array();
    for (var i = 0; i < cityStates.length; i++) {
      if (!stateArr.includes(cityStates[i].state))
        stateArr.push(cityStates[i].state);
    }

    _states(stateArr.sort());
  }, []);

  if (userData !== null) history.push("/");
  return (
    <>
      <ToastContainer />
      <div className={`${styles.container_login}`}>
        <div className={`${styles.form_outer}`}>
          <div className={`${styles.form_inner}`}>
            <p className={`${styles.reg}`}>Register</p>
            <div className={`${styles.formpng}`}>
              <div className={`${styles.form_inner_inner}`}>
                {/* SigningUp with Google */}
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
                      Sign Up With Google
                    </button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
                <p style={{ textAlign: "center" }}>OR</p>
                {/* Signing Up through registration form */}
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
                      {/* State */}
                      <div className={`${styles.col}`}>
                        <select
                          name="state"
                          id="state"
                          className={styles.form_control}
                          onChange={handleInputs}
                        >
                          <option value="Select">Select your state</option>
                          {states?.map((val, key) => (
                            <option value={val}>{val}</option>
                          ))}
                        </select>

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
                    <i class="fas fa-city"></i>
                    <div className={`${styles.form_name}`}>
                      {/* City */}
                      <div className={`${styles.col}`}>
                        <select
                          name="city"
                          id="city"
                          className={styles.form_control}
                          onChange={handleInputs}
                        >
                          {user?.state == "Select" ? (
                            <option value="Choose">
                              Choose Your state first
                            </option>
                          ) : (
                            <option value="Select">Select Your city</option>
                          )}
                          {user?.state !== "Select" &&
                            cities?.map((val, key) => (
                              <option value={val}>{val}</option>
                            ))}
                        </select>
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
                    <i
                      className={`fa fa-user ${styles.fa_user}`}
                      aria-hidden="true"
                    ></i>
                    <div className={`${styles.form_name}`}>
                      {/* Designation */}
                      <div className={`${styles.col}`}>
                        <select
                          name="stuprof"
                          id="stuprof"
                          className={styles.form_control}
                          onChange={handleInputs}
                        >
                          <option value="Select">
                            Select Your Designation
                          </option>
                          <option value="Student">Student</option>
                          <option value="Professional">Professional</option>
                        </select>
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
                <img src={Register} alt="register_pic" />
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
      {/* Modal responsible for opening user details form after signingUp with Google */}
      <GoogleFormFillUp
        open={open}
        onCLoseModal={onCLoseModal}
        user={googleDetails}
      />
    </>
  );
};
export default Signup;
