import { sign } from 'jsonwebtoken';
export interface TokenPayloadProps {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const tokenGenerator = async (payload: TokenPayloadProps) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) throw new Error('JWT_SECRET is not defined in .env file')
  const token = await sign({ ...payload }, secretKey, { expiresIn: '30d' });
  return token;
};
