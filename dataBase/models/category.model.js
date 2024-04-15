import { Schema, model } from "mongoose";
import { fullImageURL } from "../../src/utils/sharedFunctions.js";

const categorySchema = new Schema(
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

//retutn full image url in response only and not save in db
fullImageURL(categorySchema);

const categoryModel = model("Category", categorySchema);
export default categoryModel;
