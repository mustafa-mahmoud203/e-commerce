import slugify from "slugify";
import asyncHandler from "express-async-handler";
import productModel from "../../dataBase/models/product.model.js";
import ApiError from "../utils/apiError.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const data = req.body;
  data.slug = slugify(data.title);

  const product = await productModel.create(data);

  return res
    .status(201)
    .json({ message: "Done", results: product.length, data: product });
});

export const getProducts = asyncHandler(async (req, res, next) => {
  // *1  convert to int
  const page = req.query.page * 1 || 2;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const Products = await productModel.find({}).skip(skip).limit(limit);
  return res.status(200).json({
    message: "Done",
    results: Products.length,
    page,
    data: Products,
  });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel.findById(productId);
  if (!product) return next(new ApiError("product not found", 404));

  return res
    .status(200)
    .json({ message: "Done", results: product.length, data: product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const data = req.body;
  data.slug = slugify(data.title);
  const product = await productModel.findByIdAndUpdate(productId, data, {
    new: true,
  });
  // when use findByIdAndUpdate
  if (!product) return next(new ApiError("product not found", 404));

  return res
    .status(200)
    .json({ message: "Done", results: product.length, data: product });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel.findByIdAndDelete(productId);
  if (!product) return next(new ApiError("product not found", 404));

  return res.status(200).json({ message: "Done" });
});
