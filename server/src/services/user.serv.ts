import { createUserModel, deleteUserModel, searchEmail } from '../models/user.mod';
import { v4 as uuidv4 } from 'uuid';
import { genSaltSync, hashSync } from 'bcryptjs';

export interface NewUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
export const createUserService = async (name: string, email: string, password: string) => {
  // const user = await searchEmail(email);

  // if (user.rowCount) return { resp: { message: 'Email already exists' }, code: 400 };

  // const isAdmin = await searchRole('admin')

  // const role = isAdmin ? 'user' : 'admin';

  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  const id = uuidv4();
  const createdUser = await createUserModel(id, name, email, hash);
  if (!createdUser.rowCount) return { resp: { message: 'User not created in database' }, code: 400 };
  // console.log('CONSOLLAANDDO', createdUser);
  // const newUser = {
  //   id,
  //   name,
  //   email,
  //   password
  // };
  return { resp: createdUser.rows, code: 201 };
};

export const deleteUserService = async (id: string, user: NewUserProps) => {
  if (id !== user.id && user.role !== 'admin') return { resp: { message: 'Unauthorized' }, code: 401 };
  const deletedUser = await deleteUserModel(id);
  if (!deletedUser) return { resp: { message: 'User not deleted in database' }, code: 400 };
  return { resp: { message: 'User deleted' }, code: 200 };
}