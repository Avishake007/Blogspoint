const dotenv=require('dotenv');
const express=require('express');
const app=express();
// config.env file helps to keep the secret details safe from the
// outside world
var cookieParser = require('cookie-parser')
app.use(cookieParser())
dotenv.config({path:'./config.env'});
require('./db/conn');
const PORT=process.env.PORT;

app.use(express.json());

//Linking of router file
app.use(require('./router/auth'));

//User Schema
const User=require('./model/userSchema');
//Home Page
app.get('/',(req,res)=>{
    res.send("Hello World");
});
// Middleware : It allows us to show the required page to the 
//              authenticate user only
// const middleware=(res,req,next)=>{
//         console.log("Middleware");

//         next();// This statement makes the page appear
//  }
 //About Page
// app.get('/about',middleware,(req,res)=>{
//     res.send("about");
// });
//Signin Page
app.get('/signin',(req,res)=>{
    res.send("Signin");
});
//Signup Page
app.get('/signup',(req,res)=>{
    res.send("Signup");
});
//Remaining Page
app.get('/*',(req,res)=>{
    res.send("404");
})
//Server connection
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});

