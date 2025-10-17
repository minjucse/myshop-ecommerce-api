import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { applyForDriverZodSchema, updateAvailabilityZodSchema, updateLocationZodSchema } from "./driver.validation";
import { driverController } from "./driver.controller";

export const DriverRoutes = Router()

DriverRoutes.post('/apply', checkAuth(Role.Rider), validateRequest(applyForDriverZodSchema), driverController.driverApplication)

DriverRoutes.post('/me/availability', checkAuth(Role.Driver), validateRequest(updateAvailabilityZodSchema), driverController.updateAvailability)

DriverRoutes.get('/me/earnings', checkAuth(Role.Driver), driverController.getEarnings);
DriverRoutes.patch(
      '/me/location',
      checkAuth(Role.Driver),
      validateRequest(updateLocationZodSchema),
      driverController.updateLocation
);

export default DriverRoutes;