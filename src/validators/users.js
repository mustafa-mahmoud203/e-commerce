import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";
import userModel from "../../dataBase/models/user.model.js";
import ApiError from "../utils/apiError.js";

// export const getBrand = [
//   check("brandId").isMongoId().withMessage("invalid Brand Id"),
//   validationMiddleware,
// ];

// export const deleteBrand = [
//   check("brandId").isMongoId().withMessage("invalid Brand Id"),
//   validationMiddleware,
// ];

// export const updateBrand = [
//   check("brandId").isMongoId().withMessage("invalid Brand Id"),
//   check("name")
//     .notEmpty()
//     .withMessage("name is required")
//     .isLength({ min: 3 })
//     .withMessage("name must be more than 2 letters")
//     .isLength({ max: 32 })
//     .withMessage("name must be less than 33 letters"),

//   validationMiddleware,
// ];
// export const updateBrandImage = [
//   check("brandId").isMongoId().withMessage("invalid Brand Id"),

//   validationMiddleware,
// ];

export const createUser = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("name must be at most 32 characters"),

  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .custom(async (email) => {
      const checkEmail = await userModel.findOne({ email });
      if (checkEmail) {
        throw new ApiError("email already exists....", 400);
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new ApiError("Password Confirmation incorrect", 400);
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation is required"),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("Invalid phone number only accepted Egypt  numbers"),

  check("profileImg").optional(),
  check("role").optional(),

  validationMiddleware,
];
