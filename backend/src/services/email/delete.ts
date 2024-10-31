import Email, { IEmail } from "../../models/Email";
import { BaseResponse } from "../../interfaces/BaseResponse";

export const deleteEmail = async (id: string): Promise<BaseResponse<null>> => {
  const deletedEmail = await Email.findByIdAndDelete(id);
  if (!deletedEmail) {
    return {
      success: false,
      message: "Email not found",
    };
  }
  return {
    success: true,
    message: "Email deleted successfully",
    data: null,
  };
};
