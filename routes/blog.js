const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const blogController = require("../controllers/blogController");

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, `${fileName}`);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new-blog", blogController.getAddNewBlog);
router.post("/add-new-blog",upload.single("coverImage"),blogController.addNewBlog);
router.post("/comment/:blogId", blogController.addNewComment);
router.get("/:id", blogController.getBlogById);

module.exports = router;
