import config from '../config/envVariablesLoad';
import { Request, Response } from 'express';
import UserService from '../services/userService';
import AuthService from '../services/authService';

export default class AuthController {
  private userService: UserService;
  private authService: AuthService;

  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService;
    this.authService = authService;
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.userService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await this.authService.authenticate({ username, password });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = this.authService.generateToken(user.id);
    return res.json({ token, expiresIn: config.JWT_SECRET_EXPIRES_IN });
  }
}