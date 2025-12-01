import { QueryBuilder } from "../../../utils/QueryBuilder";
import { IContactMessage } from "./contactMessage.interface";
import ContactMessage from "./contactMessage.model";
import { contactMessageSearchableFields } from "./contactMessage.constant";
import { sendEmail } from "../../../utils/sendEmail";
import { envVars } from "../../../config/env";
import AppError from "../../../errorHelpers/AppError";

const createContactMessageIntoDB = async (
  payload: IContactMessage
) => {
  const result = await ContactMessage.create(payload);

  // Send confirmation email to client
  try {
    await sendEmail({
      to: payload.email,
      subject: "Thank You - We Received Your Message",
      templateName: "contactConfirmation",
      templateData: {
        clientName: payload.clientName,
        subject: payload.subject,
        frontendUrl: envVars.FRONTEND_URL_2,
      },
    });
  } catch (emailError) {
    console.error("Failed to send confirmation email:", emailError);
  }

  // Send admin notification
  try {
    await sendEmail({
      to: envVars.EMAIL_SENDER.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${payload.subject}`,
      templateName: "contactNotification",
      templateData: {
        clientName: payload.clientName,
        clientEmail: payload.email,
        subject: payload.subject,
        message: payload.message,
        dashboardUrl: `${envVars.FRONTEND_URL}/admin/contacts/${result._id}`,
      },
    });
  } catch (emailError) {
    console.error("Failed to send admin notification:", emailError);
  }

  return result;
};

const getAllContactMessagesFromDB = async (
  query: Record<string, any>
) => {
  const queryBuilder = new QueryBuilder(
    ContactMessage.find({ isActive: true }),
    query
  );

  const [data, meta] = await Promise.all([
    queryBuilder
      .filter()
      .search(contactMessageSearchableFields)
      .sort()
      .fields()
      .paginate()
      .build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleContactMessageFromDB = async (id: string) => {
  const result = await ContactMessage.findById(id);

  if (!result) {
    throw new AppError(404, "Contact message not found");
  }

  // Mark as read
  if (result.status === "new") {
    result.status = "read";
    await result.save();
  }

  return result;
};

const updateContactMessageIntoDB = async (
  id: string,
  payload: Partial<IContactMessage>
) => {
  const result = await ContactMessage.findById(id);

  if (!result) {
    throw new AppError(404, "Contact message not found");
  }

  Object.assign(result, payload);
  await result.save();

  return result;
};

const deleteContactMessageFromDB = async (id: string) => {
  const result = await ContactMessage.findById(id);

  if (!result) {
    throw new AppError(404, "Contact message not found");
  }

  result.isActive = false;
  await result.save();

  return result;
};

export const ContactMessageServices = {
  createContactMessageIntoDB,
  getAllContactMessagesFromDB,
  getSingleContactMessageFromDB,
  updateContactMessageIntoDB,
  deleteContactMessageFromDB,
};