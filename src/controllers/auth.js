import asyncHandler from "express-async-handler";
import { jwtSign } from "../utils/token.js";
import ApiError from "../utils/apiError.js";
import userModel from "../../dataBase/models/user.model.js";
import slugify from "slugify";
import {
  comparePassword,
  hashPassword,
} from "../utils/hashAndComparePassword.js";

export const signup = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const checkEmail = await userModel.findOne({ email: data.email });
  if (checkEmail) {
    return next(new ApiError("email already exists....", 400));
  }

  data.slug = slugify(data.name);
  data.password = hashPassword(data.password);
  if (req.file) data.profileImg = req.file.image;
  const user = await userModel.create(data);

  const payload = {
    userId: user._id,
    name: user.name,
    email: user.email,
  };
  const token = jwtSign({ payload: payload });

  console.log(token);
  return res
    .status(201)
    .json({ message: "Done", result: user.length, data: user, token });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  const checkPass = comparePassword({
    password: password,
    userPassword: user.password,
  });
  if (!user || !checkPass)
    return next(new ApiError("invalid email or password", 400));

  const payload = {
    userId: user._id,
    name: user.name,
    email: user.email,
  };
  const token = jwtSign({ payload: payload });
  return res.status(201).json({ message: "Done", result: user.length, token });
});
