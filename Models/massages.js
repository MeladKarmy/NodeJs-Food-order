const mongoose = require("mongoose");

const massageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "Name Is Require"],
  },
  email: {
    type: String,
    trim: true,
    require: [true, "Email Is Require"],
    lowercase: true,
  },
  subject: { type: String, required: [true, "Subject Is Require"] },
  massage: { type: String, required: [true, "Massage Is Require"] },
});

module.exports = mongoose.model("massges", massageSchema);
