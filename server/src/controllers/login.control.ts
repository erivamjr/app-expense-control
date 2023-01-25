import { Request, Response } from "express";
import { loginService } from "../services/login.serv";
import { LoginSchema } from "../utils/schemas";

export const login = async (req: Request, res: Response) => {
  const login = LoginSchema.safeParse(req.body);
  if (!login.success) return res.status(400).json(login.error.issues);

  const { email, password } = login.data;

  const { resp, code } = await loginService(email, password);
  return res.status(code).json(resp);
}
