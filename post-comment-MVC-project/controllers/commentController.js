import {
  getPostById,
  getCommentsByPostId,
  getAllComments,
  addComment,
} from "../lib/db.js";

class CommentController {
  async commentsPage(req, res) {
    const id = req.params.id;
    const post = await getPostById(id);
    const comments = await getCommentsByPostId(id);
    res.render("comment", { post, comments });
  }

  async postComments(req, res) {
    const id = req.params.id;
    await addComment(req.body, id);
    const post = await getPostById(id);
    const comments = await getCommentsByPostId(id);
    res.render("comment", { post, comments });
  }
}
export default new CommentController();
