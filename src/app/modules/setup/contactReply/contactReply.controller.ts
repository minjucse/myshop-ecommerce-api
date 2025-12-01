import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { ContactReplyServices } from "./contactReply.service";
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';

// =======================================
// Create Reply
// =======================================

const createReply = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // ContactMessageId
  const result = await ContactReplyServices.createReplyIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Reply sent successfully",
    data: result,
  });
});

// =======================================
// Get All Replies for a Contact Message
// =======================================

const getAllReplies = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // ContactMessageId
  const result = await ContactReplyServices.getAllRepliesByContactId(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Replies retrieved successfully",
    data: result,
  });
});

// =======================================
// Get Single Reply
// =======================================

const getSingleReply = catchAsync(async (req: Request, res: Response) => {
  const { replyId } = req.params;
  const result = await ContactReplyServices.getSingleReply(replyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply retrieved successfully",
    data: result,
  });
});

// =======================================
// Update Reply
// =======================================

const updateReply = catchAsync(async (req: Request, res: Response) => {
  const { replyId } = req.params;
  const result = await ContactReplyServices.updateReply(replyId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply updated successfully",
    data: result,
  });
});

// =======================================
// Delete Reply
// =======================================

const deleteReply = catchAsync(async (req: Request, res: Response) => {
  const { replyId } = req.params;
  const result = await ContactReplyServices.deleteReply(replyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply deleted successfully",
    data: result,
  });
});

// =======================================
// Export Controller
// =======================================

export const ContactReplyControllers = {
  createReply,
  getAllReplies,
  getSingleReply,
  updateReply,
  deleteReply,
};
