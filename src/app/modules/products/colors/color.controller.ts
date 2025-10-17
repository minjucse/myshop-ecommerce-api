import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { colorServices } from './color.service';

const createColor = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload
  const payload = { ...req.body, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await colorServices.createColorIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color is created successfully',
    data: result,
  });
});

const getAllColors = catchAsync(async (req: Request, res: Response) => {
  // Accept page & limit from body (or query)
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await colorServices.getAllColorsFromDB({
    ...filters,
    page: Number(page),
    limit: Number(limit),
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Colors Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});


const getSingleColor = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await colorServices.getSingleColorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color is retrieved successfully',
    data: result,
  });
});

const updateColor = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await colorServices.updateColorIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color is updated successfully',
    data: result,
  });
});

const deleteColor = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await colorServices.deleteColorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color Delete successfully',
    data: result,
  });
});
export const colorControllers = {
  createColor,
  getAllColors,
  getSingleColor,
  updateColor,
  deleteColor
};
