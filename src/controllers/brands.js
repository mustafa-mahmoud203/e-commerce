import AsyncHandler from "express-async-handler";
import brandModel from "../../dataBase/models/brand.model.js";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";

export const createBrand = AsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ message: "Done", result: brand.length, data: brand });
});

export const getBrands = AsyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const brands = await brandModel.find({}).skip(skip).limit(limit);
  return res
    .status(200)
    .json({ message: "Done", page, result: brands.length, data: brands });
});

export const getSpecificBrand = AsyncHandler(async (req, res, next) => {
  const { brandId } = req.params;

  const brand = await brandModel.findById(brandId);

  if (!brand) {
    return next(new ApiError("Brand not found", 404));
  }

  return res
    .status(200)
    .json({ message: "Done", result: brand.length, data: brand });
});

export const updateBrand = AsyncHandler(async (req, res, next) => {
  const { brandId } = req.params;
  const { name } = req.body;
  const brand = await brandModel.findByIdAndUpdate(
    brandId,
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) return next(new ApiError("Category not found", 404));

  return res
    .status(200)
    .json({ message: "Done", results: brand.length, data: brand });
});

export const deleteBrand = AsyncHandler(async (req, res, next) => {
  const { brandId } = req.params;
  const brand = await brandModel.findByIdAndDelete(brandId);
  if (!brand) return next(new ApiError("Brand not found", 404));

  return res.status(200).json({ message: "Done" });
});