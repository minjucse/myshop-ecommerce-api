import express from "express";
import { checkAuth } from "../../../middlewares/checkAuth";
import { validateRequest } from "../../../middlewares/validateRequest";
import { ContactReplyControllers } from "./contactReply.controller";
import { ContactReplyValidation } from "./contactReply.validation";
import { Role } from "../../user/user.interface";

const router = express.Router({ mergeParams: true });

router.post(
  "/create",
 
  validateRequest(ContactReplyValidation.createContactReplyValidationSchema),
  ContactReplyControllers.createReply
);


router.get("/", ContactReplyControllers.getAllReplies);

router
  .route("/:replyId")
  .get(ContactReplyControllers.getSingleReply)
  .patch(
  
    validateRequest(ContactReplyValidation.createContactReplyValidationSchema),
    ContactReplyControllers.updateReply
  )
  .delete(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    ContactReplyControllers.deleteReply
  );

export const ContactReplyRoutes = router;
