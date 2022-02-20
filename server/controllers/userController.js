const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");

exports.user_signup = async (req, res) => {
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
    console.log(userUsernameExist);
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
};
exports.user_signin = async (req, res) => {
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
};
exports.user_google_signin = async (req, res) => {
  const { email} = req.body;

  try {
    let token;
    if (!email) {
      return res.status(res.json({ error: "Please fill the data" }));
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      // const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      // if (isMatch) {
      //   return res.json({ message: "Successful Login" });
      // } else {
      //   return res.status(400).json({ error: "Invalid Credentials" });
      // }
      return res.json({ message: "Successful Login" });
    } else {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.user_logout = (req, res) => {
  console.log("Logout");
  res.clearCookie("jwtoken", { path: "/" });

  res.status(200).send("Logout");
};
exports.get_user_details = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);

    response.status(200).json(user);
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.update_user = async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    await User.findByIdAndUpdate(request.params.id, {
      profilePic: request.file.path,
    });
    console.log(JSON.parse(JSON.stringify(request.body)));
    console.log(request.file);
    response.status(200).json("User updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
