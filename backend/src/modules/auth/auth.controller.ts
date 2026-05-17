import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.schema';
import { sendSuccess } from '../../shared/utils/apiResponse';
import { asyncHandler } from '../../shared/utils/asyncHandler';

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const dto = req.body as RegisterDto;
  const result = await authService.register(dto);
  sendSuccess(res, result, 'Account created successfully.', 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const dto = req.body as LoginDto;
  const result = await authService.login(dto);
  sendSuccess(res, result, 'Login successful.');
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const user = await authService.getMe(userId);
  sendSuccess(res, user, 'User retrieved.');
});
