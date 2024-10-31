import { Request, Response } from "express";
import { registerService } from "../services/auth/register";
import { loginService } from "../services/auth/login";
import { logoutService } from "../services/auth/logout";
import { sendErrorResponse, sendResponse } from "../utils/response";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body;

  try {
    const response = await registerService(username, password);
    return sendResponse(res, 200, response);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  try {
    const response = await loginService(username, password);
    return sendResponse(res, 200, response);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];
  if (!token) {
    return sendErrorResponse(res, "Token is missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: string;
  };
  const userId = decoded.id;

  try {
    const response = await logoutService(userId);
    return sendResponse(res, 200, response);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};
