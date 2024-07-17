import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import UserService from '../services/userService';
import config from '../config/envVariablesLoad';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: config.JWT_SECRET_EXPIRES_IN });
      return res.json({ token, expiresIn: config.JWT_SECRET_EXPIRES_IN });
    })(req, res);
  }
}

export default new AuthController();