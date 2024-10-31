import { Request, Response } from "express";
import { sendResponse, sendErrorResponse } from "../utils/response";
import { createEmail } from "../services/email/create";
import { getEmailById } from "../services/email/read";
import { updateEmail } from "../services/email/update";
import { deleteEmail } from "../services/email/delete";
import { getListEmail } from "../services/email/list";
import { sendEmail } from "../services/email/send";

export const createEmailController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await createEmail(req.body);
    return sendResponse(res, 201, response);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const getListEmailController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await getListEmail();
    return sendResponse(res, 200, response);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const getEmailByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await getEmailById(req.params.id);
    return sendResponse(res, 200, response);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const updateEmailController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await updateEmail(req.params.id, req.body);
    return sendResponse(res, 200, response);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const deleteEmailController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await deleteEmail(req.params.id);
    return sendResponse(res, 200, response);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const sendEmailController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await sendEmail(req.body);
    return sendResponse(res, 200, response);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};
