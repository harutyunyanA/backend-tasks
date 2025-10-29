import { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true, trim: true },
  imageURL: { type: String, default: "" },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
});

export default model("Post", postSchema);
