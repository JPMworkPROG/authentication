import UserSchema, { IUser } from '../models/userModel';

interface IUserService {
  findById(id: string): Promise<IUser | null>;
  create(data: IUser): Promise<IUser>;
}

export default class UserService implements IUserService {
  async create(data: IUser): Promise<IUser> {
    try {
      const user = new UserSchema(data);
      await user.save();
      return user;
    } catch (error) {
      switch (error) {
        case error.code === 11000:
          throw new Error('Email in use.');
        default:
          throw new Error(`Error in create user: ${error.message}`);
      }
    }
  }

  async findById(id: string): Promise<IUser | null> {
    return UserSchema.findById(id);
  }
}