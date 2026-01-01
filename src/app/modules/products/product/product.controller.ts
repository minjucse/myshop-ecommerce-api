import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { ProductServices } from "./product.service";

// ---------------------------
// Create Product
// ---------------------------
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload;

  const payload = {
    ...req.body,
    createdBy: decodeToken.userId,
    updatedBy: decodeToken.userId,
  };

  const result = await ProductServices.createProductIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

// ---------------------------
// Get All Products
// ---------------------------
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await ProductServices.getAllProductDetailsFromDB({
    ...filters,
    page: Number(page),
    limit: Number(limit),
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// ---------------------------
// Get Dropdown Products
// ---------------------------
const getDropdownProducts = catchAsync(async (_req: Request, res: Response) => {
  const result =
    await ProductServices.getDropdownProductDetailFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dropdown products fetched successfully",
    data: result,
  });
});

// ---------------------------
// Get Single Product
// ---------------------------
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result =
    await ProductServices.getSingleProductDetailFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// ---------------------------
// Update Product
// ---------------------------
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result =
    await ProductServices.updateProductDetailIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// ---------------------------
// Delete Product
// ---------------------------
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result =
    await ProductServices.deleteProductDetailFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getDropdownProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
