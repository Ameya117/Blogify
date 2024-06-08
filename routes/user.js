const { Router } = require("express");
const User = require("../models/user");
const router = Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  let uniqueUser = await User.findOne({ email: req.body.email });
  if (uniqueUser) {
    return res
      .status(400)
      .json({ success: false, error: "Email already used" });
  }
  const { fullName, email, password } = req.body;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    // Store hash in your password DB.
    await User.create({
      fullName: fullName,
      email: email,
      password: hash,
    });
  });
  return res.redirect("/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ success: false, error: "User not found" });
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (!result) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid password" });
    }
    return res.redirect("/");
  });
});

module.exports = router;
