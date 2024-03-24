import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import { jwtVerify } from "../utils/token.js";
import userModel from "../../dataBase/models/user.model.js";

export const auth = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) return next(new ApiError("Token is required", 401));

  if (!authorization.startsWith(process.env.BERAR_KEY))
    return next(new ApiError("In-valid Berar Key", 400));

  const token = authorization.split(" ")[1];

  const decoded = jwtVerify({ token });

  if (!decoded) return next(new ApiError("invalid token", 401));

  const user = await userModel.findById(decoded.userId);
  if (!user) return next(new ApiError("Not Register account", 401));

  req.user = user;
  next();
});

export const isAllowedTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new ApiError("You are not allowed to access this route", 401)
      );

    next();
  });
};
