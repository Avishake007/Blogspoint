const express=require('express');
const Post=require("../model/post");
const Comment=require("../model/comment");
const Reply=require("../model/replies");
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
    // console.log("Middleware");
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
    // console.log(req.body);
    try{
        let token;
        if(!email||!password){
            return res.status(res.json({error:"Please fill the data"}));
        }
        const userLogin=await User.findOne({email:email});
       
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
            token=await userLogin.generateAuthToken();
            // console.log(token);

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            if(isMatch){
                // console.log("Match");
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
    // console.log("Logout");
    res.clearCookie('jwtoken',{path:'/'});
    
    res.status(200).send("Logout")
});

router.post('/create',async(req,res)=>{
    try {
        const post = await new Post(req.body);
        post.save();
        res.status(200).json('Post saved successfully');
        // console.log("kop")
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
router.post('/updateUser/:id',async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        console.log(request.params.id)
        await User.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('User updated successfully');
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
router.get('/post/user/:id',async(request,response)=>{
    let posts;
    // console.log("oo")
    try{
        if(request.params.id){
            posts=await Post.find({userId : request.params.id});
        }
        response.status(200).json(posts);
        // console.log("po")
        // console.log(request+"   pop")
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

            // console.log('Hoe', posts)
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
})
router.post('/post/update/user/:id',async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        console.log(request.params.id)
        await User.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('User updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
});
router.post('/createComment',async(req,res)=>{
    try {
        const comment = await new Comment(req.body);
        comment.save();
        res.status(200).json('Comment saved successfully');
        // console.log("kop")
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/comment/:id', async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);

        response.status(200).json(comment);
    } catch (error) {
        response.status(500).json(error)
    }
});
router.get('/comment/user/:id',async(request,response)=>{
    let comments;
    // console.log("oo")
    try{
        if(request.params.id){
            comments=await Comment.find({postId : request.params.id});
        }
        response.status(200).json(comments);
        // console.log("po")
        // console.log(request+"   pop")
    }
    catch(error){
        response.status(500).json(error)
    }
})
router.post('/comment/update/:id',async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        
        await Comment.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('comment updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
});
router.post('/comment/update/user/:id',async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        console.log(request.params.id)
        await User.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('User updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
});
router.post('/reply/create',async(req,res)=>{
    try {
        const reply = await new Reply(req.body);
        reply.save();
        res.status(200).json('Reply saved successfully');
        // console.log("kop")
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/reply/comment/:id',async(request,response)=>{
    let replies;
   
    try{
        if(request.params.id){
            replies=await Reply.find({commentId : request.params.id});
        }
        response.status(200).json(replies);
        
    }
    catch(error){
        response.status(500).json(error)
    }
})
router.post('/reply/update/:id',async (request, response) => {
    try {
        const reply = await Reply.findById(request.params.id);
        
        await Reply.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('reply updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
});
router.post('/reply/update/user/:id',async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        console.log(request.params.id)
        await User.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('User updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
});
module.exports=router;