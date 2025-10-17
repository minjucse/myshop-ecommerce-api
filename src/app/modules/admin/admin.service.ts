import AppError from "../../errorHelpers/AppError";
import { Driver } from "../driver/driver.model";
import { Role, IsActive } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";

/**
 * Update a user's status (active/inactive/suspended)
 */
const updateUserStatus = async (userId: string, newStatus: IsActive) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User id not found", "");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { status: newStatus },
    { new: true, runValidators: true }
  );

  return updatedUser;
};

/**
 * Get all driver applications that are pending approval
 */
const getAllDriverApplications = async () => {
  const applications = await Driver.find({ approvalStatus: "pending" }).populate(
    "user",
    "-password"
  );

  if (!applications || applications.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No pending driver applications found",
      ""
    );
  }

  return applications;
};

/**
 * Approve a driver application and assign DRIVER role to the user
 */
const approvalDriver = async (applicationId: string) => {
  const application = await Driver.findById(applicationId);

  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver application not found", "");
  }

  application.approvalStatus = "approved";
  await application.save();

  await User.findByIdAndUpdate(application.user, { role: Role.Driver });

  return application;
};

/**
 * Reject a driver application
 */
const rejectDriver = async (applicationId: string) => {
  const application = await Driver.findById(applicationId);

  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver application not found", "");
  }

  application.approvalStatus = "rejected";
  await application.save();

  return application;
};

export const AdminService = {
  updateUserStatus,
  getAllDriverApplications,
  approvalDriver,
  rejectDriver,
};
