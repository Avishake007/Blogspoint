//Importing Reply Schema
const Reply = require("../model/replies");
exports.create_reply = async (req, res) => {
  try {
    const reply = await new Reply(req.body);
    reply.save();
    response.status(200).json({
      message: `Reply is created successfully`,
      reply: reply,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      reply: null,
    });
  }
};
exports.get_reply = async (request, response) => {
  const { id } = request.params;
  try {
    const replies = await Reply.find({ commentId: id });
    if (replies)
      response.status(200).json({
        message: `Replies with comment id ${id} is found`,
        replies: replies,
      });
    else
      response.status(404).json({
        message: `No replies with comment id ${id} is found`,
        replies: null,
      });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      replies: null,
    });
  }
};
exports.update_reply = async (request, response) => {
  const { id } = request.params;
  try {
    const reply = await Reply.findById(id);

    await Reply.findByIdAndUpdate(id, { $set: request.body });
    if (reply)
      response.status(200).json({
        message: `Reply with id ${id} is updated`,
        updatedReply: reply,
      });
    else
      response.status(404).json({
        message: `No reply with id ${id} is updated`,
        updatedReply: null,
      });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      updatedReply: null,
    });
  }
};
exports.delete_reply = async (request, response) => {
  const { id } = request.params;
  try {
    const reply = await Reply.findById(id);

    await reply.delete();
    if (reply)
      response.status(200).json({
        message: `Reply with id ${id} is deleted`,
        deletedReply: reply,
      });
    else
      response.status(404).json({
        message: `No reply with id ${id} is deleted`,
        deletedReply: null,
      });
  } catch (error) {
    response.status(500).json({
      message: `No reply with id ${id} is deleted`,
      deletedReply: null,
    });
  }
};
exports.delete_replies_by_commentId = async (request, response) => {
  const { id } = request.params;
  try {
    const replies = await Reply.deleteMany({ commentId: id });
    if (replies)
      response.status(200).json({
        message: `Replies with comment id ${id} is deleted`,
        deletedReplies: null,
      });
    else
      response.status(404).json({
        message: `No replies with comment id ${id} is deleted`,
        deletedReplies: null,
      });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      deletedReplies: null,
    });
  }
};
exports.delete_replies_by_postId = async (request, response) => {
  try {
    const replies = await Reply.deleteMany({ postId: request.params.id });
    if (replies)
      response.status(200).json({
        message: `Replies with post id ${id} is deleted`,
        deletedReplies: replies,
      });
    else
      response.status(404).json({
        message: `No replies with post id ${id} is deleted`,
        deletedReplies: null,
      });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      deletedReplies: null,
    });
  }
};
