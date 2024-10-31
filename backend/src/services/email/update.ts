import Email, { IEmail } from "../../models/Email";
import { BaseResponse } from "../../interfaces/BaseResponse";

export const updateEmail = async (
  id: string,
  emailData: Partial<IEmail>
): Promise<BaseResponse<IEmail>> => {
  const updatedEmail = await Email.findByIdAndUpdate(id, emailData, {
    new: true,
  });
  if (!updatedEmail) {
    return {
      success: false,
      message: "Email not found",
    };
  }
  return {
    success: true,
    message: "Email updated successfully",
    data: updatedEmail,
  };
};
