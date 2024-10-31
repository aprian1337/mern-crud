import { getTransporter } from "../../helper/transporterEmail";
import { BaseResponse } from "../../interfaces/BaseResponse";

interface SendRequest {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async (
  req: SendRequest
): Promise<BaseResponse<null>> => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: req.to,
    subject: req.subject,
    text: req.text,
  };

  try {
    await getTransporter().sendMail(mailOptions);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error sending email",
    };
  }
};
