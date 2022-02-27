const Comment = require("../model/comment");

exports.create_comment = async (req, res) => {
  try {
    const comment = await new Comment(req.body);
    comment.save();
    response.status(200).json({
      message: "Comment created Successfully",
      comment: comment,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      comment: null,
    });
  }
};
exports.get_comment = async (request, response) => {
  const { id } = request.params;
  try {
    const comment = await Comment.findById(id);
    if (comment) {
      response.status(200).json({
        message: `Comment with id ${id} is found`,
        comment: comment,
      });
    } else {
      response.status(404).json({
        message: `No comment with id ${id} is found`,
        comment: null,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
      comment: null,
    });
  }
};
exports.get_comment_by_postId = async (request, response) => {
  let comments;
  const { id } = request.params;
  try {
    comments = await Comment.find({ postId: id });
    if (comments)
      response.status(200).json({
        message: `Comment/s with post id ${id} is found`,
        comments: comments,
      });
    else
      response.status(404).json({
        message: `No comment/s with post id ${id} is found`,
        comments: null,
      });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      comments: null,
    });
  }
};
exports.update_comment = async (request, response) => {
  const { id } = request.params;
  try {
    const comment = await Comment.findByIdAndUpdate(id, { $set: request.body });
    if (comment)
      response.status(200).json({
        message: `Comment with id ${id} is updated`,
        updatedComment: comment,
      });
    else
      response.status(404).json({
        message: `No comment with id ${id} is updated`,
        updatedComment: null,
      });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      updatedComment: null,
    });
  }
};
exports.delete_comment = async (request, response) => {
  const { id } = request.params;
  try {
    const comment = await Comment.findById(id);

    await comment.delete();
    if (comment)
      response.status(200).json({
        message: `Comment with id ${id} is deleted`,
        deletedComment: null,
      });
    else
      response.status(404).json({
        message: `No comment with id ${id} is deleted`,
        deletedComment: null,
      });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      deletedComment: null,
    });
  }
};
exports.delete_comment_by_postId = async (request, response) => {
  const { id } = request.params;
  try {
    const comment = await Comment.deleteMany({ postId: id });
    if (comment)
      response.status(200).json({
        message: `Comment with post id ${id} is deleted`,
        deletedComment: comment,
      });
    else
      response.status(404).json({
        message: `No comment with post id ${id} is deleted`,
        deletedComment: null,
      });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      deletedComment: null,
    });
  }
};
