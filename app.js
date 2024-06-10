require("dotenv").config();

const express = require("express");
const path = require("path");
const Blog = require("./models/blog");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const connectToMongo = require("./controllers/mongoConnection");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

// connectToMongo("mongodb://127.0.0.1:27017/blogify");
connectToMongo(process.env.MONGO_URL);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({})
  res.render("home", { user: req.user , blogs:allBlogs});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
