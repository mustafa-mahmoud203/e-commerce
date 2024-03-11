import slugify from "slugify";
import asyncHandler from "express-async-handler";
import productModel from "../../dataBase/models/product.model.js";
import ApiError from "../utils/apiError.js";
import categoryModel from "../../dataBase/models/category.model.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const data = req.body;
  data.slug = slugify(data.title);

  //validate for category
  // const category = await categoryModel.findById(data.category);
  // if (!category) return next(new ApiError("Category not found", 404));

  const product = await productModel.create(data);

  return res
    .status(201)
    .json({ message: "Done", results: product.length, data: product });
});

export const getProducts = asyncHandler(async (req, res, next) => {
  //filtering
  const excludesFields = ["page", "limit", "sort", "fields"];
  const filteringObj = { ...req.query };
  excludesFields.forEach((item) => delete filteringObj[item]);

  let filteringQuery = JSON.stringify(filteringObj);
  const regex = /\b(gt|gte|lt|lte|in)\b/g;
  filteringQuery = filteringQuery.replace(regex, (val) => `$${val}`); //  //(val) => "$"+val`
  filteringQuery = JSON.parse(filteringQuery);

  //pagination
  // *1  convert to int
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 25;
  const skip = (page - 1) * limit;
  let ProductsQuery = productModel
    .find(filteringQuery)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    ProductsQuery = ProductsQuery.sort(sortBy);
  } else {
    ProductsQuery = ProductsQuery.sort("createdAt");
  }

  //select some fields
  if (req.query.fields) {
    const fieldsSelected = req.query.fields.split(",").join(" ");
    ProductsQuery = ProductsQuery.select(fieldsSelected);
  }else {
    ProductsQuery = ProductsQuery.select("-__v");

  }

  const Products = await ProductsQuery;
  return res.status(200).json({
    message: "Done",
    results: Products.length,
    page,
    data: Products,
  });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await productModel
    .findById(productId)
    .populate({ path: "category", select: "name " });
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
