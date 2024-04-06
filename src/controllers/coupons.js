import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import couponModel from "../../dataBase/models/coupon.model.js";

export const createCoupon = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const coupon = await couponModel.create(data);
  res.status(201).json({ message: "Done", data: coupon });
});

export const getCoupons = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(couponModel, req).paginate();
  const coupons = await apiFeatures.modelQuery;

  // const couponsQuery = couponModel.find({}).skip(skip).limit(limit);
  // const coupons = await couponsQuery;

  return res.status(200).json({
    message: "Done",
    // page,
    result: coupons.length,
    data: coupons,
  });
});

export const getSpecificCoupon = asyncHandler(async (req, res, next) => {
  const { couponId } = req.params;

  const coupon = await couponModel.findById(couponId);

  if (!coupon) {
    return next(new ApiError("coupon not found", 404));
  }

  return res.status(200).json({ message: "Done", data: coupon });
});

export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const { couponId } = req.params;
  const coupon = await couponModel.findByIdAndDelete(couponId);
  if (!coupon) return next(new ApiError("coupon not found", 404));

  return res.status(200).json({ message: "Done" });
});

export const updateCoupon = asyncHandler(async (req, res, next) => {
  const { couponId } = req.params;
  const data = req.body;
  const coupon = await couponModel.findByIdAndUpdate(couponId, data, {
    new: true,
  });
  if (!coupon) return next(new ApiError("Category not found", 404));

  return res.status(200).json({ message: "Done", data: coupon });
});
