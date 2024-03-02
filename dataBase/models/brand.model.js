// import { Schema, model } from "mongoose";

import { Schema, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
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

const brandModel = model("Brand", brandSchema);

export default brandModel;
