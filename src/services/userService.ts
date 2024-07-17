import UserSchema from '../models/userModel';
import { Error } from 'mongoose';

class UserService {
  async create(data: any) {
    try {
      const user = new UserSchema(data);
      await user.save();
      return user;
    } catch (error: any) {
      if (error instanceof Error.ValidationError) {
        throw new Error(`Validation Error: ${error.message}`);
      }
      if (error.code === 11000) {
        throw new Error('Email in use.');
      }
      throw new Error(`Error in create user: ${error.message}`);
    }
  }

  async authenticate(username: string, password: string) {
    try {
      const user = await UserSchema.findOne({ username });
      if (user && await user.comparePassword(password)) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(`Error in find user: ${error.message}`);
    }
  }

  async findById(id: string) {
    return UserSchema.findById(id);
  }
}

export default new UserService();