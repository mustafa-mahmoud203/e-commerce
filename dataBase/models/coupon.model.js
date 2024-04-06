import { Schema, model } from "mongoose";

const couponSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    expire: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const couponModel = model("Coupon", couponSchema);

export default couponModel;
