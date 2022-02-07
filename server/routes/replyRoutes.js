//Third Party import
const router = require("express").Router();
//Importing Reply Schema
const Reply = require("../model/replies");
require("../db/conn");
//Creating a reply
router.post("/create", async (req, res) => {
  try {
    const reply = await new Reply(req.body);
    reply.save();
    res.status(200).json("Reply saved successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
//Fetching replies according to comment id
router.get("/comment/:id", async (request, response) => {
  let replies;

  try {
    if (request.params.id) {
      replies = await Reply.find({ commentId: request.params.id });
    }
    response.status(200).json(replies);
  } catch (error) {
    response.status(500).json(error);
  }
});
//Updating a reply according to reply id
router.post("/update/:id", async (request, response) => {
  try {
    const reply = await Reply.findById(request.params.id);

    await Reply.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("reply updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
});
module.exports = router;
