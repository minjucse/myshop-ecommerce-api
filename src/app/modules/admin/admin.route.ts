import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { updateUserStatusValidationSchema } from "./admin.validation";
import { AdminController } from "./admin.controller";

const AdminRoutes = Router()

AdminRoutes.patch('/users/:id/status', checkAuth(Role.Admin), validateRequest(updateUserStatusValidationSchema), AdminController.updateUserStatus)
AdminRoutes.get('/driver-applications', checkAuth(Role.Admin), AdminController.getAllDriverApplications)
AdminRoutes.patch('/driver-applications/:id/approve', checkAuth(Role.Admin), AdminController.approvalDriver)
AdminRoutes.patch('/driver-applications/:id/reject', checkAuth(Role.Admin), AdminController.rejectDriverApproval)

export default AdminRoutes;