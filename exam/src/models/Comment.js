import { Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
  text: { type: String, required: true, trim: true },
  postId: { type: Types.ObjectId, ref: "Comment" },
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export default model("Comment", commentSchema);
