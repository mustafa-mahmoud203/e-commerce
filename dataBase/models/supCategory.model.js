import { Schema, model } from "mongoose";

const supCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true, // to remove spaces from beginning and end of the name
      require: true,
      unique: true,
      minlength: 2,
      maxlength: 32,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      require: true,
    },
  },
  { timestamps: true }
);

const supCategoryModel = model("SupCategory", supCategorySchema);

export default supCategoryModel;
