import Email, { IEmail } from "../../models/Email";
import { BaseResponse } from "../../interfaces/BaseResponse";

export const createEmail = async (
  emailData: IEmail
): Promise<BaseResponse<IEmail>> => {
  const email = new Email(emailData);
  const savedEmail = await email.save();
  return {
    success: true,
    message: "Email created successfully",
    data: savedEmail,
  };
};
