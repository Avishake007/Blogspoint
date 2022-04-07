//Third Party import
const router = require("express").Router();
//Local Imports
const {
  user_signup,
  user_signin,
  user_logout,
  get_user_details,
  update_user,
  user_google_signin,
  update_user_info,
} = require("../controllers/userController");
require("../db/conn");
//Importing authenticate middleware
const authenticate = require("../middleware/authenticate");
//Importing multer from utils to handle images
const upload = require("../utils/multer");
/**
 * DESC: SIGNUP'S A USER INTO THE WEBSITE
 * METHOD: POST
 * CONTROLLER:userController.user_signup
 * ENDPOINT: /user/
 */
router.post("/signup", user_signup);
/**
 * DESC: SIGNIN'S A USER INTO THE WEBSITE
 * METHOD: POST
 * CONTROLLER:userController.user_signin
 * ENDPOINT: /user/
 */
router.post("/signin", user_signin);
/**
 * DESC: SIGNIN'S A USER INTO THE WEBSITE THROUGH GOOGLE
 * METHOD: POST
 * CONTROLLER:userController.user_google_signin
 * ENDPOINT: /user/
 */
router.post("/google/signin",user_google_signin);
/**
 * DESC: LOG'S OUT OF THE WEBSITE 
 * METHOD: GET
 * CONTROLLER:userController.user_logout
 * ENDPOINT: /user/
 */
router.get("/logout", user_logout);
/**
 * DESC: CHECKS WHETHER THE USER IS AUTHENTICATED
 * METHOD: GET
 * ENDPOINT: /user/
 */
router.get("/authenticate", authenticate, (req, res) => {
  res.send(req.rootUser);
});
/**
 * DESC: FETCHES USER DETAILS 
 * METHOD: GET
 * CONTROLLER:userController.get_user_details
 * ENDPOINT: /user/
 */
router.get("/:id", get_user_details);
/**
 * DESC: UPDATES USER'S PROFILE PIC
 * METHOD: POST
 * CONTROLLER:userController.update_user
 * ENDPOINT: /user/
 */
router.post("/update/:id", upload.single("profilePic"), update_user);
/**
 * DESC: UPDATES USER'S INFORMATION
 * METHOD: POST
 * CONTROLLER:userController.update_user_info
 * ENDPOINT: /user/
 */
router.post("/update/info/:id", update_user_info);
module.exports = router;
