import express from "express";
import { checkAuth } from "../../../middlewares/checkAuth";
import { validateRequest } from "../../../middlewares/validateRequest";
import { ProductControllers } from "./product.controller";
import { ProductValidation } from "./product.validation";
import { Role } from "../../user/user.interface";

const router = express.Router();

// ---------------------------
// Routes
// ---------------------------

// Get All Products
router.post(
  "/",
  ProductControllers.getAllProducts
);

// Dropdown
router.get(
  "/dropdown",
  ProductControllers.getDropdownProducts
);

// Create Product
router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductControllers.createProduct
);

// Single Product CRUD
router
  .route("/:id")
  .get(ProductControllers.getSingleProduct)
  .patch(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(ProductValidation.updateProductValidationSchema),
    ProductControllers.updateProduct
  )
  .delete(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    ProductControllers.deleteProduct
  );

export const ProductRoutes = router;
