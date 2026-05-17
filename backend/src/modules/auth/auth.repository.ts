import { IUser } from '../../models/user.model';
import { User } from '../../models/user.model';

export class AuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    // Explicitly select password (it's excluded by default)
    return User.findOne({ email }).select('+password');
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'sales';
  }): Promise<IUser> {
    return User.create(data);
  }

  async emailExists(email: string): Promise<boolean> {
    const count = await User.countDocuments({ email });
    return count > 0;
  }
}
