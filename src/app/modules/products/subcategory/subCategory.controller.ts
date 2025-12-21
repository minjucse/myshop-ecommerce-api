import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { SubCategoryServices } from './subCategory.service';

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload
  const payload = { ...req.body, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await SubCategoryServices.createSubCategoryIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is created successfully',
    data: result,
  });
});

const getAllSubCategorys = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await SubCategoryServices.getAllSubCategorysFromDB({
    ...filters,
    page: Number(page),
    limit: Number(limit),
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Sub Categorys Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});


const getSingleSubCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SubCategoryServices.getSingleSubCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is retrieved successfully',
    data: result,
  });
});

const updateSubCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SubCategoryServices.updateSubCategoryIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category is updated successfully',
    data: result,
  });
});

const deleteSubCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SubCategoryServices.deleteSubCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category Delete successfully',
    data: result,
  });
});
export const SubCategoryControllers = {
  createSubCategory,
  getAllSubCategorys,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory
};
