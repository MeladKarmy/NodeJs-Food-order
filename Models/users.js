const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    nameEn: {
      type: String,
      trim: true,
      require: [true, "Name Is Require"],
    },
    nameAr: {
      type: String,
      trim: true,
      require: [true, "Name Is Require"],
    },
    email: {
      type: String,
      trim: true,
      require: [true, "Email Is Require"],
      unique: [true, "Email Is already used please, try another Email ..."],
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      require: [true, "password Is Require"],
      min: [8, "password Is too short"],
    },
    phone: {
      type: Number,
      trim: true,
      require: [true, "Phone Is Require"],
      unique: [true, "Phone Is already used please, try another Email ..."],
      lowercase: true,
    },
    Role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("users", userSchema);
