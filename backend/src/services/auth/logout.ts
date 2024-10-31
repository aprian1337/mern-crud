import { BaseResponse } from "../../interfaces/BaseResponse";
import User, { IUser } from "../../models/User";
import {
  ERROR_LOGOUT_NOT_FOUND,
  ERROR_LOGOUT_UNKNOWN,
} from "../../utils/errors";

export const logoutService = async (
  userId: string
): Promise<BaseResponse<IUser>> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return {
        success: false,
        message: "User not found.",
        error: "User does not exist.",
        error_code: ERROR_LOGOUT_NOT_FOUND,
      };
    }

    user.logoutTimestamps.push(new Date());
    await user.save();

    return {
      success: true,
      message: "Logout successful.",
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: "Logout failed.",
      error: error instanceof Error ? error.message : "Unknown error occurred.",
      error_code: ERROR_LOGOUT_UNKNOWN,
    };
  }
};
