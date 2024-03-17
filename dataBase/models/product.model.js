import { Schema, model } from "mongoose";
import { fullImageURL } from "../../src/utils/sharedFunctions.js";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 20000,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      max: 10000000,
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    image: {
      type: String,
      required: true,
    },
    images: [String],
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategories: [
      {
        type: Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

fullImageURL(productSchema);

const productModel = model("Product", productSchema);

export default productModel;
