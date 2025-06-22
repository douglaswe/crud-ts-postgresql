import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface TokenPayload {
  username: string;
  tipo: string;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  } 

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user;
    next();
  });
}

// import bcrypt from 'bcrypt';
// bcrypt.hash('admin123', 10).then(console.log);$2b$10$7tWvLiHWp4gJ0Ue8wPJJ5uiekjKmKTy2qsrJWF1a62RuLHq18sU4u