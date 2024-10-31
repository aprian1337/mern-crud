import Email, { IEmail } from "../../models/Email";
import { BaseResponse } from "../../interfaces/BaseResponse";

export const getListEmail = async (): Promise<BaseResponse<IEmail[]>> => {
  try {
    const emails = await Email.find();

    return {
      success: true,
      message: "Emails retrieved successfully",
      data: emails,
    };
  } catch (error) {
    console.error("Error retrieving emails:", error);
    return {
      success: false,
      message: "Error retrieving emails",
    };
  }
};
