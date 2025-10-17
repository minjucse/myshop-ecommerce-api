import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { requestRideZodSchema, updateRideStatusZodSchema } from './ride.validation';
import { RideControllers } from './ride.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const RideRoutes = Router();

RideRoutes.post(
  '/request',
  checkAuth(Role.Rider), // Shudhumatro RIDER-ra request korte parbe
  validateRequest(requestRideZodSchema),
  RideControllers.requestRide,
);
RideRoutes.patch('/:rideId/accept', checkAuth(Role.Driver), RideControllers.AccptRide);
RideRoutes.patch(
  '/:rideId/status',
  checkAuth(Role.Driver),
  validateRequest(updateRideStatusZodSchema),
  RideControllers.updateRideStatus,
);
RideRoutes.patch(
  '/:rideId/cancel',
  checkAuth(Role.Rider),
  RideControllers.cancelRide,
);
RideRoutes.get(
  '/pending',
  checkAuth(Role.Driver), 
  RideControllers.getPendingRides,
);
RideRoutes.get(
  '/history',
  checkAuth(Role.Rider, Role.Driver), 
  RideControllers.getRideHistory,
);
export default RideRoutes;