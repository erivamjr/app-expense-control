import { createUser, searchEmail, searchRole } from '../models/user.mod';
import { v4 as uuidv4 } from 'uuid';

export interface NewUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
export const createUserService = async (name: string, email: string, password: string) => {
  const user = await searchEmail(email);

  if (user) return { resp: { message: 'Email already exists' }, code: 400 };

  const isAdmin = await searchRole('admin')

  const role = isAdmin ? 'user' : 'admin';

  const id = uuidv4();
  const createdUser = await createUser(id, name, role, email, password);
  if (!createdUser) return { resp: { message: 'User not created in database' }, code: 400 };
  const newUser = {
    id,
    name,
    role,
    email,
    password
  };
  return { resp: newUser, code: 201 };
};
