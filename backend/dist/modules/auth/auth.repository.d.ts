import { IUser } from '../../models/user.model';
export declare class AuthRepository {
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    create(data: {
        name: string;
        email: string;
        password: string;
        role: 'admin' | 'sales';
    }): Promise<IUser>;
    emailExists(email: string): Promise<boolean>;
}
//# sourceMappingURL=auth.repository.d.ts.map