import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { MeasurementUnitServices } from './measurementUnit.service';

const createMeasurementUnit = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload
  const payload = { ...req.body, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await MeasurementUnitServices.createMeasurementUnitIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Group is created successfully',
    data: result,
  });
});

const getAllMeasurementUnits = catchAsync(async (req: Request, res: Response) => {
  // Accept page & limit from body (or query)
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await MeasurementUnitServices.getAllMeasurementUnitsFromDB({
    ...filters,
    page: Number(page),
    limit: Number(limit),
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Attribute Groups Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getDropdownMeasurementUnits = async (req: Request, res: Response) => {
  const data = await MeasurementUnitServices.getDropdownMeasurementUnitsFromDB();
  res.status(200).json({
    success: true,
    message: 'Attribute Groups for dropdown fetched successfully',
    data,
  });
};

const getSingleMeasurementUnit = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MeasurementUnitServices.getSingleMeasurementUnitFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Group is retrieved successfully',
    data: result,
  });
});

const updateMeasurementUnit = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MeasurementUnitServices.updateMeasurementUnitIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Group is updated successfully',
    data: result,
  });
});

const deleteMeasurementUnit = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MeasurementUnitServices.deleteMeasurementUnitFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Group Delete successfully',
    data: result,
  });
});
export const MeasurementUnitControllers = {
  createMeasurementUnit,
  getAllMeasurementUnits,
  getSingleMeasurementUnit,
  getDropdownMeasurementUnits,
  updateMeasurementUnit,
  deleteMeasurementUnit
};
