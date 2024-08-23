import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  articleName: { type: String, required: true },
  articleDescription: { type: String, required: true },
  articleTags: { type: [String], required: true },
  articlePhoto: { type: String, required: true },
  editorContent: { type: String },
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  status: { type: String, required: true },
  views: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  readTime: { type: Number, default: 0 },
  publishedDate: { type: Date },
  comments: [
    {
      text: { type: String },
      author: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
