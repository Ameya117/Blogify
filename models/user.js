const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/defaultProfileImage.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) return next();
//   bcrypt.hash(this.password, saltRounds, function (err, hash) {
//     // Store hash in your password DB.
//     console.log(hash)
//     this.password = hash;
//   });
//   next();
// });

const User = model("user", userSchema);

module.exports =  User;
