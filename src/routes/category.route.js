import { Router } from "express";
import * as controllers from "../controllers/category.js";
const router = Router();

router.post("/", controllers.createCategory);
router.get("/", controllers.getCategorys);
router.get("/:id", controllers.specifiCategory);
router.patch("/:id", controllers.updateCategory);
router.delete("/:id", controllers.deleteCategory);
export default router;
