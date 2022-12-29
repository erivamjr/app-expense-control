import { Request, Response } from "express";
import { createUserService } from "../services/user.serv";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { resp, code } = await createUserService(name, email, password);
  if (!resp) return res.status(code).json(resp);
  return res.status(code).json(resp);
};

