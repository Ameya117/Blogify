const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const connectToMongo  = require("./controllers/mongoConnection");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));
app.use("/",userRouter)

connectToMongo("mongodb://127.0.0.1:27017/blogify")

app.get("/", (req, res) => {
  res.render("home");
});

// app.get("/signup", (req, res) => {
//   res.render("signup");
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
