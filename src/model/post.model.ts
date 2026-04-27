import mongoose, { Schema } from "mongoose";
import IPost from "../interfaces/Ipost.interface";

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }
});

export const Post = mongoose.model<IPost>("posts", postSchema);