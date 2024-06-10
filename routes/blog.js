const { Router } = require("express");
const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.resolve(`./public/uploads/${req.user.id}`));
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, `${fileName}`);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/add-new-blog", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

router.post("/add-new-blog", upload.single("coverImage"), async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.create({
    title: title,
    content: content,
    createdBy: req.user,
    coverImage: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.post("/comment/:blogId", async (req, res) => {
  const { content } = req.body;
  const { blogId } = req.params;
  await Comment.create({
    content: content,
    blogId: blogId,
    createdBy: req.user,
  });
  return res.redirect(`/blog/${blogId}`);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId: req.params.id}).populate("createdBy");
  return res.render("blog", { blog: blog, user: req.user,comments:comments });
});

module.exports = router;
