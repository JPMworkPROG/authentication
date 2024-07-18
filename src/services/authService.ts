import config from '../config/envVariablesLoad';
import UserSchema, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';

interface IAuthService {
   authenticate(authParams: Pick<IUser, "username" | "password">): Promise<IUser | null>;
   generateToken(userId: string): string;
}

class AuthService implements IAuthService {
   private secret: string = config.JWT_SECRET;
   private secretExpires: string = config.JWT_SECRET_EXPIRES_IN;

   async authenticate(authParams: Pick<IUser, "username" | "password">) {
      try {
         const user = await UserSchema.findOne({ username: authParams.username });
         if (user && await user.comparePassword(authParams.password)) {
            return user;
         }
         return null;
      } catch (error) {
         throw new Error(`Error in find user: ${error.message}`);
      }
   }

   generateToken(userId: string): string {
      return jwt.sign({ id: userId }, this.secret, { expiresIn: this.secretExpires });
   }
}

export default AuthService;