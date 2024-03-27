import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    title: {
      type: String,
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    // parent reference (one to many)
    product: {
      type: Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const reviewModel = model("Review", reviewSchema);

export default reviewModel;
