import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { BrandServices } from './brand.service';

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload
  const payload = { ...req.body, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await BrandServices.createBrandIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand is created successfully',
    data: result,
  });
});

const getAllBrands = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await BrandServices.getAllBrandsFromDB({
    ...filters,
    page: Number(page),
    limit: Number(limit),
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Brands Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getDropdownBrands = async (req: Request, res: Response) => {
  const data = await BrandServices.getDropdownBrandFromDB();
  res.status(200).json({
    success: true,
    message: 'Categories for dropdown fetched successfully',
    data,
  });
}; 
const getSingleBrand = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BrandServices.getSingleBrandFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand is retrieved successfully',
    data: result,
  });
});

const updateBrand = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BrandServices.updateBrandIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand is updated successfully',
    data: result,
  });
});

const deleteBrand = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BrandServices.deleteBrandFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand Delete successfully',
    data: result,
  });
});

export const BrandControllers = {
  createBrand,
  getAllBrands,
  getDropdownBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand
};
