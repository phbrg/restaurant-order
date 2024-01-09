import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getToken } from './getToken';

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  const token: string = getToken(req);

  if(!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  try {
    req.user = jwt.verify(token, '-{^VN@5Z32;#');

    next();
  } catch(err) {
    res.status(400).json({ message: 'Invalid token.'});
    return;
  }
}