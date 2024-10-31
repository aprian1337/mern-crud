import nodemailer from "nodemailer";

let transporterInstance = null;

export function getTransporter() {
  if (!transporterInstance) {
    transporterInstance = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_FROM_PASSWORD,
      },
    });
  }
  return transporterInstance;
}
