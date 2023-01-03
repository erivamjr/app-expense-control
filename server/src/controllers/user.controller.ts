import { Request, Response } from "express";
import { createUserService, deleteUserService } from "../services/user.serv";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { code, resp } = await createUserService(name, email, password);
  return res.status(code).json(resp);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.body;
  const { code, resp } = await deleteUserService(id, user);
  return res.status(code).json(resp);
};