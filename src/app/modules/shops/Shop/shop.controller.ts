import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { ShopServices } from './shop.service';

const createShop = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload
  const logoPath = req.file ? `/uploads/shop/${req.file.filename}` : "";

  const payload = { ...req.body, logoUrl: logoPath, createBy: decodeToken.userId, updateBy: decodeToken.userId };
  const result = await ShopServices.createShopIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop is created successfully',
    data: result,
  });
});

const getAllShops = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ShopServices.getAllShopsFromDB(query as Record<string, string>);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shops are retrieved successfully',
    data: result.data,
    meta: result.meta
  });
});

const getSingleShop = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShopServices.getSingleShopFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop is retrieved successfully',
    data: result,
  });
});

const updateShop = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decodeToken = req.user as JwtPayload;

  // If a new file is uploaded, build the new path
  let logoUrl: string | undefined;
  if (req.file) {
    logoUrl = `/uploads/shop/${req.file.filename}`;
  }

  // Merge body and file path, and add updateBy
  const payload = {
    ...req.body,
    ...(logoUrl && { logoUrl }),      // only override if a new file is present
    updateBy: decodeToken.userId,
  };

  const result = await ShopServices.updateShopIntoDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop is updated successfully",
    data: result,
  });
});

const deleteShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ShopServices.deleteShopFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop Delete successfully',
    data: result,
  });
});

export const ShopControllers = {
  createShop,
  getAllShops,
  getSingleShop,
  updateShop,
  deleteShop
};
