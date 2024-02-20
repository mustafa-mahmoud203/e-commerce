// import { Schema, model } from "mongoose";

import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      minlength: 3,
      maxlength: 32,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const categoryModel = model("Category", categorySchema);

export default categoryModel;
