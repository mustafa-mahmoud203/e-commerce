import { Router } from "express";
import * as controllers from "../controllers/category.js";
import * as validators from "../validators/category.js";

const router = Router();

router.post("/", controllers.createCategory);
router.get("/", controllers.getCategorys);
router.get("/:id", validators.getCategory, controllers.specifiCategory);
router.patch("/:id", validators.updateCategory, controllers.updateCategory);
router.delete("/:id", validators.deleteCategory, controllers.deleteCategory);
export default router;
