import crypto from "crypto";

import asyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { hashPassword } from "../utils/hashAndComparePassword.js";
import userModel from "../../dataBase/models/user.model.js";

import sendEmail from "../utils/sendEmail.js";

export const createUser = asyncHandler(async (req, res, next) => {
  const data = req.body;
  data.slug = slugify(data.name);
  data.password = hashPassword(data.password);

  const checkEmail = await userModel.findOne({ email: data.email });
  if (checkEmail) {
    return next(new ApiError("email already exists....", 400));
  }

  if (req.file) data.profileImg = req.file.profileImg;

  const user = await userModel.create(data);
  res.status(201).json({ message: "Done", result: user.length, data: user });
});

export const getUsers = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(userModel, req).paginate();
  const users = await apiFeatures.modelQuery;

  // const usersQuery = userModel.find({}).skip(skip).limit(limit);
  // const users = await usersQuery;

  return res.status(200).json({
    message: "Done",
    // page,
    result: users.length,
    data: users,
  });
});

export const getSpecificUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const user = await userModel.findById(userId);
  if (!user) {
    return next(new ApiError("user not found", 404));
  }

  return res
    .status(200)
    .json({ message: "Done", result: user.length, data: user });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await userModel.findByIdAndDelete(userId);
  if (!user) return next(new ApiError("user not found", 404));

  return res.status(200).json({ message: "Done" });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const data = req.body;
  const checkUser = await userModel.findById(userId);
  if (!checkUser) return next(new ApiError("User not found", 404));
  data.slug = slugify(data.name || checkUser.name);
  const user = await userModel.updateOne({ _id: userId }, data);

  return res
    .status(200)
    .json({ message: "Done", results: user.length, data: user });
});

export const updateUserImage = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  if (!req.file) return next(new ApiError("file is requird", 400));
  const user = await userModel.findByIdAndUpdate(
    userId,
    { profileImg: req.file.image },
    {
      new: true,
    }
  );

  if (!user) return next(new ApiError("user not found", 404));
  return res
    .status(200)
    .json({ message: "Done", results: user.length, data: user });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  const user = await userModel.updateOne(
    { _id: userId },
    {
      password: hashPassword(newPassword),
    }
  );

  return res
    .status(200)
    .json({ message: "Done", results: user.length, data: user });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return next(new ApiError("invalid email", 404));

  //generete Generate a random 6 numbers
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hasedCode = crypto.createHash("sha256").update(resetCode).digest("hex");

  user.passwordResetCode = hasedCode;
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();

  const mailData = {
    email: email,
    subject: "Your Password reset Code ",
    message: `Hi ${user.name},\n We received a request to reset the password on your Shop Account.\n ${resetCode}\n Enter this code to complete the reset.\n Thanks for helping us keep your account secure\n The LOLO Team`,
  };
  try {
    await sendEmail(mailData);
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(new ApiError(err.message, 500));
  }
  return res.status(200).json({
    status: "Success",
    message: "Reset code sent to email",
  });
});

export const verifyResteCode = asyncHandler(async (req, res, next) => {
  const { resetCode } = req.body;
  const checkResteCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  const user = await userModel.findOne({
    passwordResetCode: checkResteCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new ApiError("reste code incurect or expired", 400));

  user.passwordResetVerified = true;
  await user.save();
  return res
    .status(200)
    .json({ status: "Succedd", message: "Success verified code" });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) return next(new ApiError("in-valid Email", 404));

  if (!user.passwordResetVerified)
    return next(new ApiError("reset code not verified", 400));

  user.password = hashPassword(newPassword);
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();
  return res
    .status(200)
    .json({ status: "Succedd", message: "Password has been changed" });
});
