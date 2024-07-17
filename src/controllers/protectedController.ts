import { Request, Response } from 'express';

class ProtectedController {
  async getProtectedData(req: Request, res: Response) {
    return res.json({ message: 'This is protected data.', user: req.user });
  }
}

export default new ProtectedController();
