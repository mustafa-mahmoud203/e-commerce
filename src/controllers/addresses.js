import asyncHandler from "express-async-handler";
import productModel from "../../dataBase/models/product.model.js";
import userModel from "../../dataBase/models/user.model.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const addUserAddress = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: data },
    },
    { new: true }
  );

  if (!user) return next(new ApiError("user not found", 404));
  return res.status(201).json({
    status: "success",
    message: "added address successfully",
    data: data,
  });
});

export const removeUserAddress = asyncHandler(async (req, res, next) => {
  const { addressId } = req.params;
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: addressId } },
    },
    { new: true }
  );

  if (!user) return next(new ApiError("user not found", 404));
  return res.status(200).json({
    status: "success",
    message: "removed address successfully",
  });
});

export const getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const filteringObj = { _id: req.user._id };
  const apiFeatuers = new ApiFeatures(userModel, req);

  apiFeatuers.paginate(filteringObj).populate({ path: "addresses" });

  const user = await apiFeatuers.modelQuery;

  if (!user) return next(new ApiError("user not found", 404));
  return res.status(200).json({
    status: "success",
    data: user,
  });
});

