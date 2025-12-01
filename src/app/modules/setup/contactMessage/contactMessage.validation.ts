import { z } from 'zod';

const createContactMessageValidationSchema = z.object({
    clientName: z.string().min(1, "Name is required"),
    email: z.string().email("Provide a valid email"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
});

const updateContactMessageValidationSchema = z.object({
    clientName: z.string().min(1, "Name is required"),
    email: z.string().email("Provide a valid email"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
    isActive: z.boolean().optional(),
    status: z.string().min(1, "status is required"),
});

export const ContactMessageValidation = {
    createContactMessageValidationSchema,
    updateContactMessageValidationSchema,
};
