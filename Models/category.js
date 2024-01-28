const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  nameEn: { type: String, required: [true, "Name In English Require"] },
  nameAr: { type: String, required: [true, "Name In Arabic Require"] },
  image: { type: String, required: [true, "Image Is Require"] },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model("categories", categorySchema);
