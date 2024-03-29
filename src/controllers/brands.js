import asyncHandler from "express-async-handler";
import brandModel from "../../dataBase/models/brand.model.js";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createBrand = asyncHandler(async (req, res, next) => {
  const data = req.body;
  data.slug = slugify(data.name);

  if (req.file) data.image = req.file.image;

  const brand = await brandModel.create(data);
  res.status(201).json({ message: "Done", result: brand.length, data: brand });
});

export const getBrands = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(brandModel, req).paginate();
  const brands = await apiFeatures.modelQuery;

  // const brandsQuery = brandModel.find({}).skip(skip).limit(limit);
  // const brands = await brandsQuery;

  return res.status(200).json({
    message: "Done",
    // page,
    result: brands.length,
    data: brands,
  });
});

export const getSpecificBrand = asyncHandler(async (req, res, next) => {
  const { brandId } = req.params;

  const brand = await brandModel.findById(brandId);

  if (!brand) {
    return next(new ApiError("Brand not found", 404));
  }

  return res
    .status(200)
    .json({ message: "Done", result: brand.length, data: brand });
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { brandId } = req.params;
  const brand = await brandModel.findByIdAndDelete(brandId);
  if (!brand) return next(new ApiError("Brand not found", 404));

  return res.status(200).json({ message: "Done" });
});

export const updateBrand = asyncHandler(async (req, res, next) => {
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

export const updateBrandImage = asyncHandler(async (req, res, next) => {
  const { brandId } = req.params;
  if (!req.file) return next(new ApiError("file is requird", 400));

  const brand = await brandModel.findByIdAndUpdate(
    brandId,
    { image: req.file.image },
    {
      new: true,
    }
  );

  if (!brand) return next(new ApiError("brand not found", 404));
  return res
    .status(200)
    .json({ message: "Done", results: brand.length, data: brand });
});
