const express=require('express');
const Post=require("../model/post");
// import createPost from '../controller/create.js'
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const router=express.Router();
const authenticate=require('../middleware/authenticate');
const User=require("../model/userSchema");
require('../db/conn');
router.get('/',(req,res)=>{
    res.send("Hello world!");
});


// username,name,state,city,stuprof,email,password,confirmpassword
// router.post('/signup', (req,res)=>{
//     const {username,name,state,city,stuprof,email,password,confirmpassword}=req.body;
//     // console.log(name);
//     // res.send(req.body);
//     if(!username || !name || !state || !city || !stuprof || !email || !password || !confirmpassword){
//         return res.status(422).json({error:"Please fill up the space"});
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exist"});
//         }
//         const user=new User({username,name,state,city,stuprof,email,password,confirmpassword});

//         user.save().then(()=>{
//             res.status(201).json({message:"user registered successfully "})
//         }).catch((err)=>res.status(500).json({error:"Failed to register"}));
//     }).catch(err=>{console.log(err)});
// });
const middleware=(res,req,next)=>{
    console.log("Middleware");
    next();
}
// Async await
router.post('/signup', async (req,res)=>{
    const {username,name,state,city,stuprof,email,password,confirmpassword}=req.body;
    // console.log(name);
    // res.send(req.body);
    if(!username || !name || !state || !city || !stuprof || !email || !password || !confirmpassword){
        return res.status(422).json({error:"Please fill all the fields"});
    }
    try{
        
        const userExist=await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"Email already exist"});
        }
        else if(password!=confirmpassword){
            return res.status(422).json("password not matching")
        }
        const user=new User({username,name,state,city,stuprof,email,password,confirmpassword});
        
        const userRegister=await user.save();
        if(userRegister){
            return res.status(201).json({message:"user registered successfully "})
        }
        else{
            return res.status(500).json({error:"Failed to register"});
        }
    }
    catch(err){
        console.log(err);
    }
});

router.post('/signin',async (req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    try{
        let token;
        if(!email||!password){
            return res.status(res.json({error:"Please fill the data"}));
        }
        const userLogin=await User.findOne({email:email});
       
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
            token=await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            if(isMatch){
                console.log("Match");
                return res.json({message:"Successful Login"});
            }
            else{
                return res.status(400).json({error:"Invalid Credentials"});
            }
        }
        else{
            return res.status(400).json({error:"Invalid Credentials"});
        }
    }
    catch(err){
        console.log(err);
    }
});
// About Page
router.get('/about',authenticate,(req,res)=>{
    res.send(req.rootUser)
});
// About Page
router.get('/logout',(req,res)=>{
    console.log("Logout");
    res.clearCookie('jwtoken',{path:'/'});
    
    res.status(200).send("Logout")
});

router.post('/create',async(req,res)=>{
    try {
        const post = await new Post(req.body);
        post.save();
        res.status(200).json('Post saved successfully');
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post('/update/:id',async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
});
router.delete('/delete/:id',async (request, response) => {
try {
    const post = await Post.findById(request.params.id);
    
    await post.delete()

    response.status(200).json('post deleted successfully');
} catch (error) {
    response.status(500).json(error)
    }

});

router.get('/post/:id', async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
});
router.get('/post/:username',async(request,response)=>{
    let posts;
    console.log("oo")
    try{
        // if(request.params.username){
        //     posts=await Post.find({username : requestusername});
        // }
        // response.status(200).json(posts);
        // console.log("po")
        console.log(request+"   pop")
    }
    catch(error){
        response.status(500).json(error)
    }
})
router.get('/posts',async(request,response)=>{
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});

            console.log('Hoe', posts)
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
})
module.exports=router;