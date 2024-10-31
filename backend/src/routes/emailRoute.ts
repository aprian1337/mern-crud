import express from "express";
import { authenticateJWT } from "../middlewares/auth";
import asyncHandler from "../middlewares/asyncHandler";
import {
  createEmailController,
  getEmailByIdController,
  updateEmailController,
  deleteEmailController,
  getListEmailController,
  sendEmailController,
} from "../controllers/emailController";

const router = express.Router();

router.get("/", authenticateJWT, asyncHandler(getListEmailController));
router.post("/", authenticateJWT, asyncHandler(createEmailController));
router.get("/:id", authenticateJWT, asyncHandler(getEmailByIdController));
router.put("/:id", authenticateJWT, asyncHandler(updateEmailController));
router.delete("/:id", authenticateJWT, asyncHandler(deleteEmailController));
router.post("/send", authenticateJWT, asyncHandler(sendEmailController));

export default router;
