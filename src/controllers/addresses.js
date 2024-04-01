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
  return res.status(200).json({
    status: "success",
    message: "address added successfully",
    data: data,
  });
});

export const removeProductToFavoritelist = asyncHandler(
  async (req, res, next) => {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) return next(new ApiError("product not found", 404));

    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { favorites: productId },
      },
      { new: true }
    );

    if (!user) return next(new ApiError("user not found", 404));
    return res.status(201).json({
      status: "success",
      message: "Product removed successfully to your favorites list.",
      data: productId,
    });
  }
);

export const getLoggedUserFavoritelist = asyncHandler(
  async (req, res, next) => {
    const filteringObj = { _id: req.user._id };
    const apiFeatuers = new ApiFeatures(userModel, req);

    apiFeatuers
      .paginate(filteringObj)
      .populate({ path: "favorites", select: "title" });

    const user = await apiFeatuers.modelQuery;

    if (!user) return next(new ApiError("user not found", 404));
    return res.status(201).json({
      status: "success",
      data: user,
    });
  }
);
