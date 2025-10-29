import { Comment, Post } from "../models/index.js";

class CommentController {
  async deleteComment(req, res) {
    try {
      const userId = req.user.id;

      const { id: commentId } = req.params;
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).send({ message: "Comment not found" });
      }

      if (userId !== comment.userId.toString()) {
        return res
          .status(403)
          .send({ message: "no rights to delete this comment" });
      }

      const post = await Post.findById(comment.postId);
      if (!post) {
        return res.status(404).send({ message: "post not found" });
      }

      post.comments = post.comments.filter(
        (comment) => comment._id.toString() !== commentId
      );
      
      await Comment.deleteOne(comment._id);
      await post.save();

      res.send({ message: "comment successfully deleted" });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error: " + err.message });
    }
  }
}

export default new CommentController();
