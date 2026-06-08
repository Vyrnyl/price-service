import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { authService } from './auth.service';
import { loginSchema } from './auth.schema';

export const authController = {
  login: asyncHandler(async (req: Request, res: Response) => {
    const validatedBody = loginSchema.parse(req.body);
    const result = await authService.login(validatedBody);

    return res.status(200).json({
      success: true,
      data: result,
      message: 'Login successful',
    });
  }),
};
