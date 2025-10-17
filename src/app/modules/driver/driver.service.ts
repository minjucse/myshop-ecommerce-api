import { JwtPayload } from "jsonwebtoken";
import { Idriver } from "./driver.inerface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Driver } from "./driver.model";
import { Ride } from "../ride/ride.modal";

const applicationForDriver = async (payload: Partial<Idriver>, decodedToken: JwtPayload) => {
  const { userId } = decodedToken;

  // Ensure no duplicate application
  const existingApplication = await Driver.findOne({ user: userId });
  if (existingApplication) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already applied to become a driver.",
      ""
    );
  }

  payload.user = userId;

  const driver = new Driver(payload);
  return await driver.save();
};

const updateAvailability = async (decodedToken: JwtPayload, isAvailable: boolean) => {
  const { userId } = decodedToken;

  const driverProfile = await Driver.findOneAndUpdate(
    { user: userId },
    { $set: { isAvailable } },
    { new: true, runValidators: true }
  );

  if (!driverProfile) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver does not exist", "");
  }

  return driverProfile;
};

const getEarningsHistory = async (decodedToken: JwtPayload) => {
  const { userId } = decodedToken;

  const completedRides = await Ride.find({
    driver: userId,
    status: "COMPLETED",
  }).populate("rider", "name phone");

  if (!completedRides?.length) {
    throw new AppError(httpStatus.NOT_FOUND, "No completed rides found.", "");
  }

  const totalEarnings = completedRides.reduce((total, ride) => {
    return total + (ride.fare || 0);
  }, 0);

  return {
    rides: completedRides,
    totalEarnings: parseFloat(totalEarnings.toFixed(2)),
  };
};

const updateCurrentLocation = async (
  decodedToken: JwtPayload,
  location: { coordinates: [number, number] }
) => {
  const { userId } = decodedToken;

  const driverProfile = await Driver.findOneAndUpdate(
    { user: userId },
    {
      currentLocation: {
        type: "Point",
        coordinates: location.coordinates,
      },
    },
    { new: true, runValidators: true }
  );

  if (!driverProfile) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver profile not found!", "");
  }

  return driverProfile;
};

export const driverService = {
  applicationForDriver,
  updateAvailability,
  getEarningsHistory,
  updateCurrentLocation,
};
