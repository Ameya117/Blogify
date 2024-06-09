const { Router } = require("express");
const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");

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
    createdBy: req.user.id,
    coverImage: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    return res.render("blog", { blog: blog, user: req.user });
    }   );

module.exports = router;
