import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      require: true,
    },

    cartItems: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "Product",
        },
        color: String,
        price: Number,
        quantity: {
          type: Number,
        },
      },
    ],
    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalOrderPrice: Number,
    paymentMethodType: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const orderModel = model("Order", orderSchema);

export default orderModel;
