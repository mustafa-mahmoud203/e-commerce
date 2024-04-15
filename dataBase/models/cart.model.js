import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    cartItems: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "Product",
        },
        color: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const cartModel = model("Cart", cartSchema);

export default cartModel;
