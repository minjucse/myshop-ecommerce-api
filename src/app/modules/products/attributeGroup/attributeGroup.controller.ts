import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { AttributeGroupServices } from './attributeGroup.service';

const createAttributeGroup = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload
  const payload = { ...req.body, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await AttributeGroupServices.createAttributeGroupIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Group is created successfully',
    data: result,
  });
});

const getAllAttributeGroups = catchAsync(async (req: Request, res: Response) => {
  // Accept page & limit from body (or query)
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await AttributeGroupServices.getAllAttributeGroupsFromDB({
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

const getDropdownAttributeGroups = async (req: Request, res: Response) => {
  const data = await AttributeGroupServices.getDropdownAttributeGroupsFromDB();
  res.status(200).json({
    success: true,
    message: 'Attribute Groups for dropdown fetched successfully',
    data,
  });
};

const getSingleAttributeGroup = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AttributeGroupServices.getSingleAttributeGroupFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Group is retrieved successfully',
    data: result,
  });
});

const updateAttributeGroup = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AttributeGroupServices.updateAttributeGroupIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Group is updated successfully',
    data: result,
  });
});

const deleteAttributeGroup = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AttributeGroupServices.deleteAttributeGroupFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attribute Group Delete successfully',
    data: result,
  });
});
export const AttributeGroupControllers = {
  createAttributeGroup,
  getAllAttributeGroups,
  getSingleAttributeGroup,
  getDropdownAttributeGroups,
  updateAttributeGroup,
  deleteAttributeGroup
};
