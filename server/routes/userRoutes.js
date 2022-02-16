//Third Party import
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { response } = require("express");
require("../db/conn");
//Importing authenticate middleware
const authenticate = require("../middleware/authenticate");
//Importing User schema
const User = require("../model/userSchema");
const upload = require("../utils/multer");
//Post the User informations into the database after validating it
router.post("/signup", async (req, res) => {
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
  } = req.body;
  if (
    !username ||
    !name ||
    !state ||
    !city ||
    !stuprof ||
    !email ||
    !password ||
    !confirmpassword
  ) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const userEmailExist = await User.findOne({ email: email });
    const userUsernameExist = await User.findOne({ username: username });
    console.log(userUsernameExist)
    if (userEmailExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (userUsernameExist) {
      return res
        .status(422)
        .json({ error: "Username already exist! Try out different username" });
    } else if (password != confirmpassword) {
      return res.status(422).json("password not matching");
    }
    const user = new User({
      username,
      profilePic,
      name,
      state,
      city,
      stuprof,
      email,
      password,
      confirmpassword,
    });

    const userRegister = await user.save();
    if (userRegister) {
      return res.status(201).json({ message: "user registered successfully " });
    } else {
      return res.status(500).json({ error: "Failed to register" });
    }
  } catch (err) {
    console.log(err);
  }
});
//Checking whether the email and its password matches for a particular user or not
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    let token;
    if (!email || !password) {
      return res.status(res.json({ error: "Please fill the data" }));
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (isMatch) {
        return res.json({ message: "Successful Login" });
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});
// Signing off the user
router.get("/logout", (req, res) => {
  console.log("Logout")
  res.clearCookie("jwtoken", { path: "/" });

  res.status(200).send("Logout");

});
// Checking whether the user is authenticated or not
router.get("/authenticate", authenticate, (req, res) => {
  res.send(req.rootUser);
});
// Fetching the user details according to user id
router.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);

    response.status(200).json(user);
  } catch (error) {
    response.status(500).json(error);
  }
});
//Updating User's information
router.post('/update/:id',upload.single("profilePic"),async (request, response,next) => {
      try {
          const user = await User.findById(request.params.id);
          await User.findByIdAndUpdate( request.params.id, { profilePic: request.file.path })
          console.log(JSON.parse(JSON.stringify(request.body)))
          console.log(request.file)
          response.status(200).json('User updated successfully');
      } catch (error) {
          response.status(500).json(error);
      }
  });
// Signing off the user
router.get("/logout", (req, res) => {
  console.log("Logout")
  res.clearCookie("jwtoken", { path: "/" });

  res.status(200).send("Logout");

});
module.exports=router;