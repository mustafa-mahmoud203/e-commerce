import { check } from "express-validator";
import validationMiddleware from "../middleware/validation.js";

export const removeAddress = [
  check("addressId").isMongoId().withMessage("invalid Product Id"),
  validationMiddleware,
];
export const createAddress = [
  check("alias")
    .notEmpty()
    .withMessage("alias is required")
    .isLength({ min: 3 })
    .withMessage(" alias must not be less than 3 letters")
    .isLength({ max: 32 })
    .withMessage("alias must not be more than 33 letters"),

  check("details")
    .notEmpty()
    .withMessage("alias is required")
    .isLength({ min: 10 })
    .withMessage(" alias must not be less than 3 letters")
    .isLength({ max: 250 })
    .withMessage("alias must not be more than 33 letters"),

  check("city")
    .notEmpty()
    .withMessage("city is required")
    .isLength({ min: 5 })
    .withMessage(" alias must not be less than 5 letters")
    .isLength({ max: 33 })
    .withMessage("alias must not be more than 33 letters"),

  check("phone")
    .notEmpty()
    .withMessage("phone number is required")
    .isMobilePhone(["ar-EG"])
    .withMessage("Invalid phone number only accepted Egypt  numbers"),

  check("postalCode")
    .notEmpty()
    .withMessage("postalCode is required")
    .isPostalCode()
    .withMessage("Invalid postal code format"),

  validationMiddleware,
];

export const updateAddress = [
  check("alias")
    .isLength({ min: 3 })
    .withMessage(" alias must not be less than 3 letters")
    .isLength({ max: 32 })
    .withMessage("alias must not be more than 33 letters"),

  check("details")
    .isLength({ min: 10 })
    .withMessage(" alias must not be less than 3 letters")
    .isLength({ max: 250 })
    .withMessage("alias must not be more than 33 letters"),

  check("city")
    .isLength({ min: 5 })
    .withMessage(" alias must not be less than 5 letters")
    .isLength({ max: 33 })
    .withMessage("alias must not be more than 33 letters"),

  check("phone")
    .isMobilePhone(["ar-EG"])
    .withMessage("Invalid phone number only accepted Egypt  numbers"),

  check("postalCode").isPostalCode().withMessage("Invalid postal code format"),

  validationMiddleware,
];
