import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { SupplierServices } from './supplier.service';

const createSupplier = catchAsync(async (req, res) => {
  const decodeToken = req.user as JwtPayload
  const payload = { ...req.body, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await SupplierServices.createSupplierIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier is created successfully',
    data: result,
  });
});

const getAllSuppliers = catchAsync(async (req, res) => {
  const result = await SupplierServices.getAllSuppliersFromDB(req.query as Record<string, string>);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Suppliers are retrieved successfully',
    data: result.data,
    meta: result.meta
  });
});

const getSingleSupplier = catchAsync(async (req, res) => {
  const { SupplierId } = req.params;
  const result = await SupplierServices.getSingleSupplierFromDB(SupplierId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier is retrieved successfully',
    data: result,
  });
});

const updateSupplier = catchAsync(async (req, res) => {
  const { SupplierId } = req.params;
  const result = await SupplierServices.updateSupplierIntoDB(SupplierId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier is updated successfully',
    data: result,
  });
});

const deleteSupplier = catchAsync(async (req, res) => {
  const { SupplierId } = req.params;
  const result = await SupplierServices.deleteSupplierFromDB(SupplierId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier Delete successfully',
    data: result,
  });
});

export const SupplierControllers = {
  createSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier
};
