const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    shippingDitails: {
      address: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      name: { type: String, required: true },
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "products",
        },
        nameEn: { type: String, required: true },
        nameAr: { type: String, required: true },
        amount: { type: Number, required: true },
        image: { type: String, required: true },
        selectSize: { type: Number, required: true },
        selectToppings: { type: Number, required: true },
        offer: { type: Boolean },
        offerNumber: { type: Number },
      },
    ],

    paymentMethod: {
      type: String,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    deliveredAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
