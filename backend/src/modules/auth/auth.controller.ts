import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authService } from "./auth.service";
import { loginSchema } from "./auth.schema";

export const authController = {
  login: asyncHandler(async (req: Request, res: Response) => {
    const validatedBody = loginSchema.parse(req.body);

    const result = await authService.login(validatedBody);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({
      success: true,
      data: result.user,
      message: "Login successful",
    });
  }),

  logout: asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }),
};
