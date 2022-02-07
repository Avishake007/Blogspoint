//Third Party import
const router = require("express").Router();
//Importing Post Schema
const Post = require("../model/post");
require("../db/conn");
//Creating a post
router.post("/create", async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();
    res.status(200).json("Post saved successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
// Fetching the post details according to post id
router.get("/:id", async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
});
//Fetching the post details according to user id
router.get("/user/:id", async (request, response) => {
  let posts;

  try {
    if (request.params.id) {
      posts = await Post.find({ userId: request.params.id });
    }
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
});
//Fecthing all posts
router.get("/", async (request, response) => {
  let username = request.query.username;
  let category = request.query.category;
  let posts;
  try {
    if (username) posts = await Post.find({ username: username });
    else if (category) posts = await Post.find({ categories: category });
    else posts = await Post.find({});

    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
});
//Updating a post according to post id
router.post("/update/:id", async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("post updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
});

//Deleting a post according to post id
router.delete("/delete/:id", async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    await post.delete();

    response.status(200).json("post deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
});
module.exports = router;
