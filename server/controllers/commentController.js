const Comment = require("../model/comment");

exports.create_comment = async (req, res) => {
  try {
    const comment = await new Comment(req.body);
    comment.save();
    res.status(200).json("Comment saved successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.get_comment = async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);

    response.status(200).json(comment);
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.get_comment_by_postId = async (request, response) => {
  let comments;

  try {
    if (request.params.id) {
      comments = await Comment.find({ postId: request.params.id });
    }
    response.status(200).json(comments);
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.update_comment = async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);

    await Comment.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("comment updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.delete_comment = async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);

    await comment.delete();

    response.status(200).json("Comment deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.delete_comment_by_postId = async (request, response) => {
  try {
    await Comment.deleteMany({ postId: request.params.id });

    response.status(200).json("Comment deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
