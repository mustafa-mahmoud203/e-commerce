import { Schema, model } from "mongoose";
import productModel from "./product.model.js";
import asyncHandler from "express-async-handler";

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

reviewSchema.statics.calculateAvgRatingAndQuantity = asyncHandler(
  async (productId) => {
    const review = await reviewModel.aggregate([
      {
        $match: { product: productId },
      },
      {
        $group: {
          _id: "$product",
          avgRating: { $avg: "$ratings" },
          quantity: { $sum: 1 },
        },
      },
    ]);

    if (review.length) {
      await productModel.findByIdAndUpdate(productId, {
        ratingsAverage: review[0].avgRating,
        ratingsQuantity: review[0].quantity,
      });
    } else {                                          
      await productModel.findByIdAndUpdate(productId, {
        ratingsAverage: 0,
        ratingsQuantity: 0,
      });
    }
  }
);

reviewSchema.post("save", async function () {
  await this.constructor.calculateAvgRatingAndQuantity(this.product);
});
reviewSchema.post("deleteOne", async function () {
  await this.constructor.calculateAvgRatingAndQuantity(this.product);
});

const reviewModel = model("Review", reviewSchema);

export default reviewModel;
