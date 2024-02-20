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
    slog: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const categoryModel = model(Category, categorySchema);

export default categoryModel;
