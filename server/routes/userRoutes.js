//Third Party import
const router = require("express").Router();
const bcrypt = require("bcryptjs");
require("../db/conn");
//Importing authenticate middleware
const authenticate = require("../middleware/authenticate");
//Importing User schema
const User = require("../model/userSchema");
//Post the User informations into the database after validating it
router.post("/signup", async (req, res) => {
  const {
    username,
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
    const userUsernameExist = await User.findOne({ usernmae: username });
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
// Checking whether the user is authenticated or not
router.get("/authenticate", authenticate, (req, res) => {
  res.send(req.rootUser);
});
//Updating User's information
router.post('/update/:id',async (request, response) => {
      try {
          const user = await User.findById(request.params.id);
          console.log(request.params.id)
          await User.findByIdAndUpdate( request.params.id, { $set: request.body })
  
          response.status(200).json('User updated successfully');
      } catch (error) {
          response.status(500).json(error);
      }
  });
// Signing off the user
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });

  res.status(200).send("Logout");
});
module.exports=router;