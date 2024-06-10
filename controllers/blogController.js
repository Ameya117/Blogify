const Blog = require("../models/blog");
const Comment = require("../models/comment");

const blogController = {
  getAddNewBlog: (req, res) => {
    return res.render("addBlog", { user: req.user }); // form for adding a new blog is rendered
  },
  addNewBlog: async (req, res) => {
    const { title, content } = req.body;
    const blog = await Blog.create({
      title: title,
      content: content,
      createdBy: req.user,
      coverImage: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
  },

  addNewComment: async (req, res) => {
    const { content } = req.body;
    const { blogId } = req.params;
    await Comment.create({
      content: content,
      blogId: blogId,
      createdBy: req.user,
    });
    return res.redirect(`/blog/${blogId}`);
  },

  getBlogById: async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );
    return res.render("blog", {
      blog: blog,
      user: req.user,
      comments: comments,
    });
  },
};

module.exports = blogController;
