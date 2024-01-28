const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nameEn: { type: String, required: [true, "Name In English Require"] },
  nameAr: { type: String, required: [true, "الاسم باللغه العربيه مطلوب"] },
  descriptionEn: {
    type: String,
    required: [true, "description In English Require"],
  },
  descriptionAr: {
    type: String,
    required: [true, "الوصف باللغه العربيه مطلوب"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "categories",
    required: [true, "category Is Require"],
  },
  image: { type: String, required: [true, "Image Is Require"] },
  quantity: { type: Number, required: [true, "Quantity Is Require"] },
  size: {
    small: {
      type: Number,
      // required: [true, "Small size price is required"],
    },
    medium: {
      type: Number,
      // required: [true, "Medium size price is required"],
    },
    large: {
      type: Number,
      // required: [true, "Large size price is required"],
    },
  },
  offer: { type: Boolean, default: false },
  offerNumber: {
    type: Number,
    validate: {
      validator: function (value) {
        return this.offer && Number.isInteger(value) && value > 0;
      },
      message: "Offer number must be a positive integer",
    },
  },
  toppingsEn: { type: [String], required: [true, "Toppings Is required"] },
  toppingsAr: { type: [String], required: [true, "الاضافات مطلوبة"] },
  toppingsPrize: {
    medium: {
      type: Number,
      // required: [true, "toppings size price is required"],
    },
    large: {
      type: Number,
      // required: [true, "toppings size price is required"],
    },
  },
});

module.exports = mongoose.model("products", ProductSchema);
