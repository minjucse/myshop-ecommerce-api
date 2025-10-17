import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload
  const payload = { ...req.body, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await CategoryServices.createCategoryIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  // Accept page & limit from body (or query)
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await CategoryServices.getAllCategoriesFromDB({
    ...filters,
    page: Number(page),
    limit: Number(limit),
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Categories Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getDropdownCategories = async (req: Request, res: Response) => {
  const data = await CategoryServices.getDropdownCategoriesFromDB();
  res.status(200).json({
    success: true,
    message: 'Categories for dropdown fetched successfully',
    data,
  });
};

const getSingleCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CategoryServices.getSingleCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is retrieved successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CategoryServices.updateCategoryIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is updated successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CategoryServices.deleteCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Delete successfully',
    data: result,
  });
});
export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  getDropdownCategories,
  updateCategory,
  deleteCategory
};
