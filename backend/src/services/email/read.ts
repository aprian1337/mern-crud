import Email, { IEmail } from "../../models/Email";
import { BaseResponse } from "../../interfaces/BaseResponse";

export const getEmailById = async (
  id: string
): Promise<BaseResponse<IEmail>> => {
  const email = await Email.findById(id);
  if (!email) {
    return {
      success: false,
      message: "Email not found",
    };
  }
  return {
    success: true,
    message: "Email retrieved successfully",
    data: email,
  };
};
