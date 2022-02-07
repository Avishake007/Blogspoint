//Third Party imports
const dotenv = require("dotenv");
const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
// config.env file helps to keep the secret details safe from the outside world

dotenv.config({ path: "./config.env" });
//Connecting to MongooDB
require("./db/conn");
//Getting the port number from config.env
const PORT = process.env.PORT;
//MiddleWare
// Middleware : It allows us to show the required page to the authenticate user only
app.use(cookieParser());
app.use(express.json());

//Importing Routes
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const commentRoute = require("./routes/commentRoutes");
const replyRoute = require("./routes/replyRoutes");
//Route middleware
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/reply", replyRoute);
//Home Page
app.get("/", (req, res) => {
  res.send("Hello World");
});
//Server connection
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
