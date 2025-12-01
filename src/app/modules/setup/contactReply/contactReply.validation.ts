import { z } from "zod";

 const createContactReplyValidationSchema = z.object({
  body: z.object({
    replyText: z.string().min(1, "Reply text is required"),
  }),
});

export const ContactReplyValidation = {
    createContactReplyValidationSchema,
    //updateContactMessageValidationSchema,
};