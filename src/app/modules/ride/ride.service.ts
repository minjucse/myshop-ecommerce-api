import { JwtPayload } from 'jsonwebtoken';
import { IRide, IRideStatus } from './ride.interface';
import AppError from '../../errorHelpers/AppError';
import httpStatus from 'http-status-codes';
import { Ride } from './ride.modal';
import { Driver } from '../driver/driver.model';

/**
 * Haversine formula to calculate distance between two coordinates
 */
const calculateDistance = (
  coords1: [number, number],
  coords2: [number, number],
): number => {
  const R = 6371; // Radius of Earth in KM
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

/**
 * Rider requests a new ride
 */
const requestRide = async (
  payload: Pick<IRide, 'pickupLocation' | 'destinationLocation'>,
  decodedToken: JwtPayload,
) => {
  const { userId } = decodedToken;

  const existingRide = await Ride.findOne({
    rider: userId,
    status: { $in: ['REQUESTED', 'ACCEPTED', 'IN_TRANSIT'] },
  });

  if (existingRide) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You already have an active ride request.',
    );
  }

  const newRideData: Partial<IRide> = {
    rider: userId,
    ...payload,
  };

  return await Ride.create(newRideData);
};

/**
 * Driver accepts a ride
 */
const acceptRide = async (rideId: string, decodedToken: JwtPayload) => {
  const { userId } = decodedToken;

  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ride request not found!');
  }

  if (ride.status !== 'REQUESTED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ride is already ${ride.status}.`,
    );
  }

  const driverProfile = await Driver.findOne({ user: userId });
  if (!driverProfile) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver profile not found!');
  }

  if (!driverProfile.isAvailable) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are offline. Please go online to accept rides.',
    );
  }

  ride.driver = userId;
  ride.status = 'ACCEPTED';
  ride.rideHistory.push({ status: 'ACCEPTED', timestamp: new Date() });

  await ride.save();
  return ride;
};

/**
 * Update ride status (driver only)
 */
const updateRideStatus = async (
  rideId: string,
  newStatus: IRideStatus,
  decodedToken: JwtPayload,
) => {
  const { userId } = decodedToken;

  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ride not found!');
  }

  if (ride.driver?.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this ride.',
    );
  }

  if (['COMPLETED', 'CANCELLED'].includes(ride.status)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Cannot update status. Ride is already ${ride.status}.`,
    );
  }

  // Allowed status transitions
  const validTransitions: Record<IRideStatus, IRideStatus[]> = {
    REQUESTED: ['ACCEPTED'],
    ACCEPTED: ['PICKED_UP'],
    PICKED_UP: ['IN_TRANSIT'],
    IN_TRANSIT: ['COMPLETED'],
    COMPLETED: [],
    CANCELLED: [],
  };

  const allowedNextStatuses = validTransitions[ride.status];
  if (!allowedNextStatuses.includes(newStatus)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Invalid transition from ${ride.status} to ${newStatus}.`,
    );
  }

  // Fare calculation when ride is completed
  if (newStatus === 'COMPLETED') {
    const PER_KM_RATE = 20;
    const BASE_FARE = 25;

    const distanceInKm = calculateDistance(
      ride.pickupLocation.coordinates,
      ride.destinationLocation.coordinates,
    );

    ride.fare = parseFloat((BASE_FARE + distanceInKm * PER_KM_RATE).toFixed(2));
  }

  ride.status = newStatus;
  ride.rideHistory.push({ status: newStatus, timestamp: new Date() });

  await ride.save();
  return ride;
};

/**
 * Rider cancels their ride request
 */
const cancelRide = async (rideId: string, decodedToken: JwtPayload) => {
  const { userId } = decodedToken;

  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ride not found!');
  }

  if (ride.rider.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to cancel this ride.',
    );
  }

  if (ride.status !== 'REQUESTED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot cancel this ride as it is already ${ride.status}.`,
    );
  }

  ride.status = 'CANCELLED';
  ride.rideHistory.push({ status: 'CANCELLED', timestamp: new Date() });

  await ride.save();
  return ride;
};

/**
 * Get ride history for rider/driver
 */
const getRideHistory = async (decodedToken: JwtPayload) => {
  const { userId, role } = decodedToken;

  let rides;
  if (role === 'Rider') {
    rides = await Ride.find({ rider: userId }).populate('driver', 'name phone');
  } else if (role === 'Driver') {
    rides = await Ride.find({ driver: userId }).populate('rider', 'name phone');
  }

  if (!rides || rides.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No ride history found.');
  }

  return rides;
};

/**
 * Get pending nearby rides for driver
 */
const getPendingRides = async (decodedToken: JwtPayload) => {
  const { userId } = decodedToken;

  const driverProfile = await Driver.findOne({ user: userId });
  if (!driverProfile) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver profile not found!');
  }

  if (!driverProfile.currentLocation?.coordinates) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Your location is not set. Update location to see nearby rides.',
    );
  }

  if (driverProfile.approvalStatus !== 'approved') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Your driver account is not approved yet.',
    );
  }

  if (!driverProfile.isAvailable) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are offline. Please go online to see ride requests.',
    );
  }

  const MAX_DISTANCE_IN_METERS = 5000;

  const pendingRides = await Ride.find({
    status: 'REQUESTED',
    pickupLocation: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: driverProfile.currentLocation.coordinates,
        },
        $maxDistance: MAX_DISTANCE_IN_METERS,
      },
    },
  }).populate('rider', 'name phone');

  if (!pendingRides || pendingRides.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No pending ride requests found nearby.',
    );
  }

  return pendingRides;
};

export const RideServices = {
  requestRide,
  acceptRide,
  updateRideStatus,
  cancelRide,
  getRideHistory,
  getPendingRides,
};
