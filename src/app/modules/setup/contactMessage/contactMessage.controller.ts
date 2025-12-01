import { Request, Response, NextFunction } from "express";
import { ContactMessageServices } from "./contactMessage.service";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

const createContactMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ContactMessageServices.createContactMessageIntoDB(
      req.body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Contact message created successfully",
      data: result,
    });
  }
);

const getAllContactMessages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { data, meta } =
      await ContactMessageServices.getAllContactMessagesFromDB(req.query);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Contact messages retrieved successfully",
      meta,
      data,
    });
  }
);

const getSingleContactMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result =
      await ContactMessageServices.getSingleContactMessageFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Contact message retrieved successfully",
      data: result,
    });
  }
);

const updateContactMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result =
      await ContactMessageServices.updateContactMessageIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Contact message updated successfully",
      data: result,
    });
  }
);

const deleteContactMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result =
      await ContactMessageServices.deleteContactMessageFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Contact message deleted successfully",
      data: result,
    });
  }
);

export const ContactMessageControllers = {
  createContactMessage,
  getAllContactMessages,
  getSingleContactMessage,
  updateContactMessage,
  deleteContactMessage,
};