import { compareSync, hashSync } from "bcryptjs";
import { searchEmail } from "../models/user.mod";
import { tokenGenerator } from "../utils/jwt";

export const loginService = async (email: string, password: string) => {

  const respUser = await searchEmail(email);

  const user = respUser.rows[0];
  const verifyPass = compareSync(password, user.password);

  if (!verifyPass || !respUser.rowCount) return { code: 401, resp: { message: 'Incorrect username or password' } };
  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  const token = await tokenGenerator({ ...data });

  return { code: 200, resp: { user: data, token } };
}