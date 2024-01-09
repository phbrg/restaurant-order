import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { Customer } from '../models/Customer';

export const getUserByToken = async (token: string, req: Request, res: Response) => {
  if(!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  
  const decoded = jwt.verify(token, '-{^VN@5Z32;#');
  const customerId = decoded.id; 

  const customer = await Customer.findOne({ raw: true, where: { id: customerId } });

  return customer;
}