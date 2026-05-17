import { UserRole } from '../../models/user.model';
export interface AuthUserDto {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}
export interface AuthResponseDto {
    token: string;
    user: AuthUserDto;
}
//# sourceMappingURL=auth.types.d.ts.map