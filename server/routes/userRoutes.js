//Third Party import
const router = require("express").Router();

const {
  user_signup,
  user_signin,
  user_logout,
  get_user_details,
  update_user,
} = require("../controllers/userController");
require("../db/conn");
//Importing authenticate middleware
const authenticate = require("../middleware/authenticate");
const upload = require("../utils/multer");
//Post the User informations into the database after validating it
router.post("/signup", user_signup);
//Checking whether the email and its password matches for a particular user or not
router.post("/signin", user_signin);
// Signing off the user
router.get("/logout", user_logout);
// Checking whether the user is authenticated or not
router.get("/authenticate", authenticate, (req, res) => {
  res.send(req.rootUser);
});
// Fetching the user details according to user id
router.get("/:id", get_user_details);
//Updating User's information
router.post("/update/:id", upload.single("profilePic"), update_user);
module.exports = router;
