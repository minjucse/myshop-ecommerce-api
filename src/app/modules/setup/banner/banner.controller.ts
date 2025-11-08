import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { BannerServices } from "./banner.service";

// Create
const createBanner = catchAsync(async (req: Request, res: Response) => {
  const decodeToken = req.user as JwtPayload;

  const imagePath = req.file ? (req.file as any).path : "";
  const payload = {
    ...req.body,
    imgPath: imagePath,
    createBy: decodeToken.userId,
    updateBy: decodeToken.userId,
  };

  const result = await BannerServices.createBannerIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner is created successfully",
    data: result,
  });
});

// List
const getAllBanners = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, ...filters } = req.body;

  const result = await BannerServices.getAllBannersFromDB({
    ...filters,
    page: Number(page),
    limit: Number(limit),
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Banners retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// Single
const getSingleBanner = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BannerServices.getSingleBannerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner is retrieved successfully",
    data: result,
  });
});

// ✅ Update with optional new image
const updateBanner = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const decodeToken = req.user as JwtPayload;

  // If a new file is uploaded, include its path
  const updatePayload: Record<string, any> = {
    ...req.body,
    updateBy: decodeToken.userId,
  };

  if (req.file) {
    updatePayload.imgPath =req.file ? (req.file as any).path : "";
  }

  const result = await BannerServices.updateBannerIntoDB(id, updatePayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner is updated successfully",
    data: result,
  });
});

// Delete
const deleteBanner = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BannerServices.deleteBannerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner deleted successfully",
    data: result,
  });
});

export const BannerControllers = {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};
