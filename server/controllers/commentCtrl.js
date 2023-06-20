import Comment from "../models/commentModel";
import Post from "../models/postModel";

export const createCommit = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;

    const post = await Post.findOne({ slug: slug });

    if (!post) {
      return res.status(404).json("Post was not found");
    }

    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser,
    });

    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { desc } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json("Comment was not found");
    }

    comment.desc = desc || comment.desc;

    const updatedComment = await comment.save();
    return res.status(201).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    await Comment.deleteMany({ parent: comment._id });

    if (!comment) {
      return res.status(404).json("Comment was not found");
    }

    return res.status(201).json({
      message: "Comment is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
