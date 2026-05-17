import { AppError } from '../../shared/utils/AppError';
import { signToken } from '../../shared/utils/jwt';
import { AuthRepository } from './auth.repository';
import { RegisterDto, LoginDto } from './auth.schema';
import { AuthResponseDto, AuthUserDto } from './auth.types';
import { IUser } from '../../models/user.model';

export class AuthService {
  private readonly repo: AuthRepository;

  constructor() {
    this.repo = new AuthRepository();
  }

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const exists = await this.repo.emailExists(dto.email);
    if (exists) {
      throw new AppError('An account with this email already exists.', 409);
    }

    const user = await this.repo.create(dto);
    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.repo.findByEmail(dto.email);
    if (!user) {
      // Deliberately vague to prevent user enumeration
      throw new AppError('Invalid email or password.', 401);
    }

    const isMatch = await user.comparePassword(dto.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password.', 401);
    }

    return this.buildAuthResponse(user);
  }

  async getMe(userId: string): Promise<AuthUserDto> {
    const user = await this.repo.findById(userId);
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  private buildAuthResponse(user: IUser): AuthResponseDto {
    const token = signToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
