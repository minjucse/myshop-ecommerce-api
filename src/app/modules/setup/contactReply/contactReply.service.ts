import ContactReply from "./contactReply.model";
import ContactMessage from "./../contactMessage/contactMessage.model";
import { IContactReply } from "./contactReply.interface";
import { sendEmail } from "../../../utils/sendEmail";
import { envVars } from "../../../config/env";
import AppError from "../../../errorHelpers/AppError";

const createReplyIntoDB = async (
  contactMessageId: string,
  payload: Omit<IContactReply, "_id" | "contactMessageId">
) => {
  const contactMessage = await ContactMessage.findById(contactMessageId);
  if (!contactMessage) {
    throw new AppError(404, "Contact message not found");
  }

  const reply = await ContactReply.create({
    contactMessageId,
    ...payload,
  });

  contactMessage.status = "replied";
  await contactMessage.save();

  try {
    await sendEmail({
      to: contactMessage.email,
      subject: `Re: ${contactMessage.subject}`,
      templateName: "contactReply",
      templateData: {
        clientName: contactMessage.clientName,
        originalSubject: contactMessage.subject,
        originalMessage: contactMessage.message,
        replyText: payload.replyText,
        repliedBy: payload.createdBy,
        frontendUrl: envVars.FRONTEND_URL,
      },
    });
  } catch (emailError) {
    console.error("Failed to send reply email:", emailError);
  }

  return reply;
};


const getAllRepliesByContactId = async (contactMessageId: string) => {
  const contactMessage = await ContactMessage.findById(contactMessageId);
  if (!contactMessage) {
    throw new AppError(404, "Contact message not found");
  }

  const replies = await ContactReply.find({
    contactMessageId,
  }).sort({ repliedAt: -1 });

  return replies;
};

const getSingleReply = async (replyId: string) => {
  const reply = await ContactReply.findById(replyId);
  if (!reply) {
    throw new AppError(404, "Reply not found");
  }
  return reply;
};

const updateReply = async (
  replyId: string,
  payload: Partial<Omit<IContactReply, "_id" | "contactMessageId">>
) => {
  const reply = await ContactReply.findByIdAndUpdate(replyId, payload, {
    new: true,
    runValidators: true,
  });

  if (!reply) {
    throw new AppError(404, "Reply not found");
  }

  return reply;
};

const deleteReply = async (replyId: string) => {
  const reply = await ContactReply.findByIdAndDelete(replyId);

  if (!reply) {
    throw new AppError(404, "Reply not found");
  }

  // If no more replies, update status back to "read"
  const remainingReplies = await ContactReply.countDocuments({
    contactMessageId: reply.contactMessageId,
  });

  if (remainingReplies === 0) {
    await ContactMessage.findByIdAndUpdate(reply.contactMessageId, {
      status: "read",
    });
  }

  return reply;
};

export const ContactReplyServices = {
  createReplyIntoDB,
  getAllRepliesByContactId,
  getSingleReply,
  updateReply,
  deleteReply,
};