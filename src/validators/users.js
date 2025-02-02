import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";
import userModel from "../../dataBase/models/user.model.js";
import ApiError from "../utils/apiError.js";
import { comparePassword } from "../utils/hashAndComparePassword.js";

export const updateUser = [
  // check("userId").isMongoId().withMessage("invalid User Id"),
  check("name")
    .optional()

    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("name must be at most 32 characters"),

  check("email").optional().isEmail(),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("Invalid phone number only accepted Egypt  numbers"),

  check("profileImg").optional(),
  check("role").optional(),

  validationMiddleware,
];

export const updateUserPassword = [
  // check("userId").isMongoId().withMessage("invalid user Id"),

  check("currentPassword")
    .notEmpty()
    .withMessage("current Password is required"),

  check("newPassword")
    .notEmpty()
    .withMessage("new Password  is required")
    .custom(async (password, { req }) => {
      // const user = await userModel.findById(req.params.userId);
      // if (!user) throw new ApiError("user not found", 404);
      if (!req.user._id) throw new ApiError("user not Loggind", 404);

      const checkCurrentPasseord = comparePassword({
        password: req.body.currentPassword,
        userPassword: req.user.password,
      });

      if (!checkCurrentPasseord)
        throw new ApiError("incorrent current password", 400);

      if (password !== req.body.passwordConfirm)
        throw new ApiError("incorrent password Confirmd", 400);
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation is required"),

  validationMiddleware,
];

export const resetPassword = [
  check("email").notEmpty().withMessage("email is required").isEmail(),

  check("newPassword")
    .notEmpty()
    .withMessage("new Password  is required")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm)
        throw new ApiError("incorrent password Confirmd", 400);
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation is required"),

  validationMiddleware,
];

export const forgotPassword = [
  check("email").notEmpty().withMessage("email is required").isEmail(),
  validationMiddleware,
];
