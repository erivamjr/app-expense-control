import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { TokenPayloadProps } from "../utils/jwt";

export const authenticatorJwt = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;//get token from header
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const superKey = process.env.JWT_SECRET;
    if (!superKey) throw new Error('SUPER_SECRET is not defined in .env file')
    const decoded = verify(token, superKey) as JwtPayload;

    const { id, email, role, name } = decoded as TokenPayloadProps;
    req.body.user = { id, email, role, name }; // add user to request body
    next();
  } catch (err: unknown) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
