import slugify from "slugify";
import asyncHandler from "express-async-handler";
import reviewModel from "../../dataBase/models/review.model.js";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createReview = asyncHandler(async (req, res, next) => {
  const data = req.body;
  if (!req.body.product) return next(new ApiError("product Id is required"));
  if (!req.body.user) req.body.user = req.user._id;
  const review = await reviewModel.create(data);

  return res
    .status(201)
    .json({ message: "Done", results: review.length, data: review });
});

export const getReviews = asyncHandler(async (req, res, next) => {
  const filterObeject = {};
  if (req.params.productId) filterObeject.product = req.params.productId;

  const apiFeatures = new ApiFeatures(reviewModel, req)
    .paginate(filterObeject)
    .sort()
    .populate({ path: "product", select: "title" });
  // .populate({ path: "product", select: "title" });
  // .filter()
  // .fields()
  // .search()
  //
  const reviews = await apiFeatures.modelQuery;
  return res.status(200).json({
    message: "Done",
    results: reviews.length,
    // page: apiFeatures.req.query.page,
    data: reviews,
  });
}); //

export const getReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await reviewModel
    .findById(reviewId)
    .populate({ path: "user product", select: "name title" });
  if (!review) return next(new ApiError("review not found", 404));

  return res
    .status(200)
    .json({ message: "Done", results: review.length, data: review });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const data = req.body;

  const review = await reviewModel.updateOne(
    { _id: reviewId, user: req.user._id },
    data,
    {
      new: true,
    }
  );
  // when use findByIdAndUpdate
  if (!review.modifiedCount)
    return next(
      new ApiError(
        "review not found or this user cna't update this review",
        404
      )
    );

  return res
    .status(200)
    .json({ message: "Done", results: review.length, data: review });
});

//TODO not works
export const deleteReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await reviewModel.findById(reviewId);
  if (!review) return next(new ApiError("review not found", 404));

  if (review.user.toString() !== req.user._id.toString())
    return next(new ApiError("this user cna't delete this review", 400));

  //   const deletedReview = await reviewModel.deleteOne({ _id: reviewId });
  await reviewModel.deleteOne({ _id: reviewId });
  return res.status(200).json({ message: "Done" });
});
