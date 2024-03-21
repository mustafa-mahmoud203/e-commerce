import asyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { hashPassword } from "../utils/hashAndComparePassword.js";
import userModel from "../../dataBase/models/user.model.js";

export const createUser = asyncHandler(async (req, res, next) => {
  const data = req.body;
  data.slug = slugify(data.name);
  data.password = hashPassword(data.password);

  if (req.file) data.profileImg = req.file.profileImg;

  const user = await userModel.create(data);
  res.status(201).json({ message: "Done", result: user.length, data: user });
});
