//Importing Reply Schema
const Reply = require("../model/replies");
exports.create_reply = async (req, res) => {
  try {
    const reply = await new Reply(req.body);
    reply.save();
    res.status(200).json("Reply saved successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.get_reply = async (request, response) => {
  let replies;

  try {
    if (request.params.id) {
      replies = await Reply.find({ commentId: request.params.id });
    }
    response.status(200).json(replies);
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.update_reply = async (request, response) => {
  try {
    const reply = await Reply.findById(request.params.id);

    await Reply.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("reply updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.delete_reply = async (request, response) => {
  try {
    const reply = await Reply.findById(request.params.id);

    await reply.delete();

    response.status(200).json("Reply deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.delete_replies_by_commentId = async (request, response) => {
  try {
    await Reply.deleteMany({ commentId: request.params.id });

    response.status(200).json("Reply deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.delete_replies_by_postId = async (request, response) => {
  try {
    await Reply.deleteMany({ postId: request.params.id });

    response.status(200).json("Reply deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
