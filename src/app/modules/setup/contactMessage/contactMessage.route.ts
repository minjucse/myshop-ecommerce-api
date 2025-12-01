import { Router } from "express";
import { ContactMessageControllers } from "./contactMessage.controller";
import { validateRequest } from '../../../middlewares/validateRequest';
import { ContactMessageValidation } from './contactMessage.validation';
import { ContactReplyRoutes } from "../contactReply/contactReply.route";
const router = Router();

router.post(
  "/send",
  validateRequest(ContactMessageValidation.createContactMessageValidationSchema),
  ContactMessageControllers.createContactMessage
);

router.get("/", ContactMessageControllers.getAllContactMessages);

router.get("/:id", ContactMessageControllers.getSingleContactMessage);

router.patch(
  "/:id",
  validateRequest(ContactMessageValidation.updateContactMessageValidationSchema),
  ContactMessageControllers.updateContactMessage
);

// Nested routes for replies
router.use("/:id/replies", ContactReplyRoutes);

router.delete("/:id", ContactMessageControllers.deleteContactMessage);

export const ContactMessageRoutes = router;
