const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    productDetails: {
      type: Array,
      default: [],
    },
    paymentDetails: {
      order_id: {
        type: String,
        default: " ",
      },
      order_amount: {
        type: String,
        default: 0,
      },
      payment_amount: {
        type: String,
        default: 0,
      },
      payment_method: [],
      payment_currency: {
        type: String,
        default: " ",
      },
      payment_group: {
        type: String,
        default: " ",
      },
      payment_status: {
        type: String,
        default: " ",
      },
    },
    shipping_status: {
      type: String,
      default: " ",
    },
    shipping_Address: {
      address: {
        type: String,
        default: " ",
      },
      city: {
        type: String,
        default: " ",
      },
      state: {
        type: String,
        default: " ",
      },
      country: {
        type: String,
        default: " ",
      },
      pin: {
        type: String,
        default: " ",
      },
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
