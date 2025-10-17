import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { sizeServices } from './size.service';

const createSize = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload
  const payload = { ...req.body, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await sizeServices.createSizeIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size is created successfully',
    data: result,
  });
});

const getAllSizes = catchAsync(async (req: Request, res: Response) => {
  // Accept page & limit from body (or query)
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await sizeServices.getAllSizesFromDB({
    ...filters,
    page: Number(page),
    limit: Number(limit),
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Sizes Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});


const getSingleSize = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await sizeServices.getSingleSizeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size is retrieved successfully',
    data: result,
  });
});

const updateSize = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await sizeServices.updateSizeIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size is updated successfully',
    data: result,
  });
});

const deleteSize = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await sizeServices.deleteSizeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size Delete successfully',
    data: result,
  });
});
export const sizeControllers = {
  createSize,
  getAllSizes,
  getSingleSize,
  updateSize,
  deleteSize
};
