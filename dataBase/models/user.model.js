import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,

    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },

    favorites: [
      {
        type: Schema.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true }
);
const userModel = model("User", userSchema);
export default userModel;
