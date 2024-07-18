import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

class UserSchema {
  private schema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }
  }, { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        delete ret["__v"];
        return ret;
      }
    }
  });

  constructor() {
    this.schema.pre('save', async function (next) {
      const user = this as IUser;
      try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
      } catch (err) {
        next(err);
      }
    });

    this.schema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
      return await bcrypt.compare(candidatePassword, this.password);
    };
  }

  getModel() {
    return model<IUser>('User', this.schema)
  }
}


export default new UserSchema().getModel()