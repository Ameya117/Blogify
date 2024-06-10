const User = require("../models/user");
const {createToken} = require("../services/authentication");  
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {
  postSignup: async (req, res) => {
    let uniqueUser = await User.findOne({ email: req.body.email });
    if (uniqueUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already used" });
    }
    const { fullName, email, password } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      await User.create({
        fullName: fullName,
        email: email,
        password: hash,
      });
    });
    return res.render("login");
  },

  postLogin: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.render("login", { error: "User not found" });
    }
    try {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (!result) {
          return res.render("login", { error: "Incorrect Password" });
        } else {
          const token = await createToken(user);
          return res.cookie("token", token).redirect("/");
        }
      });
    } catch (error) {
      return res.render("login", { error: "Incorrect Password" });
    }
  },
  getLogin: (req, res) => {
    res.render("login");
  },
  getSignup: (req, res) => {
    res.render("signup");
  },
  getLogout: (req, res) => {
    res.clearCookie("token").redirect("/");
  },
};
module.exports = userController;
