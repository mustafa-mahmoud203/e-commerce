import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";
import userModel from "../../dataBase/models/user.model.js";
import ApiError from "../utils/apiError.js";
import { comparePassword } from "../utils/hashAndComparePassword.js";

export const signup = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("name must be at most 32 characters"),

  check("email").notEmpty().withMessage("email is required").isEmail(),

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

  validationMiddleware,
];
export const login = [
  check("email").notEmpty().withMessage("email is required").isEmail(),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validationMiddleware,
];
