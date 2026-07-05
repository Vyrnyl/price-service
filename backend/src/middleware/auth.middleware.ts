import { Request, Response, NextFunction } from "express";
import { AuthUser } from "../../types/express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

export const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthUser;

    req.user = payload;

    next();
  }
);