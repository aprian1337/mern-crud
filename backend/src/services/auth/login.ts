import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { BaseResponse } from "../../interfaces/BaseResponse";
import { ERROR_LOGIN_CREDENTIAL } from "../../utils/errors";

interface LoginResponse {
  token: string;
}

export const loginService = async (
  username: string,
  password: string
): Promise<BaseResponse<LoginResponse>> => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      success: false,
      message: "Oops! We couldn't log you in.",
      error: "The username or password you entered is incorrect.",
      error_code: ERROR_LOGIN_CREDENTIAL,
    };
  }

  user.loginTimestamps.push(new Date());
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  return {
    success: true,
    message: "User logged in successfully.",
    data: { token },
  };
};
