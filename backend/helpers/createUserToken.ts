import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
}

export const createUserToken = async(user: User, req: Request, res: Response) => {
  const token = jwt.sign({
    id: user.id,
    name: user.username,
  }, '-{^VN@5Z32;#');

  // remove token ( send to cookies )
  res.status(200).json({
    message: 'You are successfully authenticated, welcome!',
    token: token
  });
}