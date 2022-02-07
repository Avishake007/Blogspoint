//Third Party import
const router = require("express").Router();
//Imorting Comment Schema
const Comment = require("../model/comment");
require("../db/conn");
//Creating a comment
router.post("/create", async (req, res) => {
  try {
    const comment = await new Comment(req.body);
    comment.save();
    res.status(200).json("Comment saved successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
//Fetching the comment details according to comment id
router.get("/:id", async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);

    response.status(200).json(comment);
  } catch (error) {
    response.status(500).json(error);
  }
});
//Fetching the comment according to post id
router.get("/post/:id", async (request, response) => {
  let comments;

  try {
    if (request.params.id) {
      comments = await Comment.find({ postId: request.params.id });
    }
    response.status(200).json(comments);
  } catch (error) {
    response.status(500).json(error);
  }
});
//Updating a comment according to comment id
router.post("/update/:id", async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);

    await Comment.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("comment updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
