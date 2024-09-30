import { Request } from 'express';

export interface IJwtPayload {
  id: number;
  email: string;
}

export interface IVerifiedRequest extends Request {
  user: IJwtPayload;
}
