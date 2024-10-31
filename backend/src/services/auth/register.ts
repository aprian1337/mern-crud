import bcrypt from "bcryptjs";
import User, { IUser } from "../../models/User";
import { BaseResponse } from "../../interfaces/BaseResponse";
import { ERROR_USER_EXIST, ERROR_USER_REGISTRATION } from "../../utils/errors";

export const registerService = async (
  username: string,
  password: string
): Promise<BaseResponse<IUser>> => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return {
        success: false,
        message: "Username already exists.",
        error: "Username already exists.",
        error_code: ERROR_USER_EXIST,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    return {
      success: true,
      message: "User registered successfully.",
      data: savedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: "Registration failed.",
      error: error instanceof Error ? error.message : "Unknown error occurred.",
      error_code: ERROR_USER_REGISTRATION,
    };
  }
};
