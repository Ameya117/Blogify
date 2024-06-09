var jwt = require("jsonwebtoken");
const { route } = require("../routes/user");
const secret = "abc123";

async function createToken(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = { createToken, validateToken };
