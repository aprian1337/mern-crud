import { Response } from "express";
import { ERROR_UNKNOWN } from "./errors";

interface BaseResponse<T> {
  success: boolean;
  message: string;
  error?: string;
  error_code?: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  response: BaseResponse<T>
): Response => {
  return res.status(statusCode).json(response);
};

export const sendErrorResponse = <T>(res: Response, error: any): Response => {
  return res.status(500).json({
    success: false,
    message: "Unknown error occurred.",
    error: error instanceof Error ? error.message : "Unknown error occurred.",
    error_code: ERROR_UNKNOWN,
  });
};
