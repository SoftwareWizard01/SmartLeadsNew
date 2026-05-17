import { RegisterDto, LoginDto } from './auth.schema';
import { AuthResponseDto, AuthUserDto } from './auth.types';
export declare class AuthService {
    private readonly repo;
    constructor();
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
    getMe(userId: string): Promise<AuthUserDto>;
    private buildAuthResponse;
}
//# sourceMappingURL=auth.service.d.ts.map