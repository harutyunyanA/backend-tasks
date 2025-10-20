import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  surname: { type: String, required: true, trim: true },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
    match: [
      /^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$/,
      "Username can contain only latin letters, digits and _",
    ],
    unique: [true, "username is busy"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    // match: [
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]+$/,
    // ],
    minLength: [8, "password is too short"],
  },
  avatar: { type: String, default: "", trim: true },
  ///DENORMALIZED VALUES
  followers: { type: Number, default: 0 },
  followings: { type: Number, default: 0 },
  posts: { type: Number, default: 0 },
});

export default model("User", userSchema);
