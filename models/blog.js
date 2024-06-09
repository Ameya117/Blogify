const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "/images/defaultProfileImage.png",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user", //referring to the user model
    },
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema);
module.exports = Blog;