import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getToken } from './getToken';

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  const token = getToken(req);

  if(!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    const verified = jwt.verify(token, '-{^VN@5Z32;#');
    req.user = verified;

    next();
  } catch(err) {
    res.status(400).json({ error: 'Invalid token.' });
    return;
  }
}