import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { AttributeValueServices } from './attributeValue.service';

const createAttributeValue = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload
  const payload = { ...req.body, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await AttributeValueServices.createAttributeValueIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Value is created successfully',
    data: result,
  });
});

const getAllAttributeValues = catchAsync(async (req: Request, res: Response) => {
  // Accept page & limit from body (or query)
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await AttributeValueServices.getAllAttributeValuesFromDB({
    ...filters,
    page: Number(page),
    limit: Number(limit),
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Attribute Values Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getDropdownAttributeValues = async (req: Request, res: Response) => {
  const data = await AttributeValueServices.getDropdownAttributeValueFromDB();
  res.status(200).json({
    success: true,
    message: 'Attribute Values for dropdown fetched successfully',
    data,
  });
};

const getSingleAttributeValue = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AttributeValueServices.getSingleAttributeValueFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Value is retrieved successfully',
    data: result,
  });
});

const updateAttributeValue = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AttributeValueServices.updateAttributeValueIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Value is updated successfully',
    data: result,
  });
});

const deleteAttributeValue = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AttributeValueServices.deleteAttributeValueFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Value Delete successfully',
    data: result,
  });
});
export const AttributeValueControllers = {
  createAttributeValue,
  getAllAttributeValues,
  getSingleAttributeValue,
  getDropdownAttributeValues,
  updateAttributeValue,
  deleteAttributeValue
};
