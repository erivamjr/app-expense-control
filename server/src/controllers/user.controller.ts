import { Request, Response } from "express";
import { createUserService, deleteUserService, getAllRegisterByUserService } from "../services/user.serv";
import { RegisterSchema, UserSchema } from "../utils/schemas";

export const createUser = async (req: Request, res: Response) => {
  const user = UserSchema.safeParse(req.body);
  if (!user.success) return res.status(400).json(user.error.issues);

  const { name, email, password } = user.data;

  const { code, resp } = await createUserService(name, email, password);
  return res.status(code).json(resp);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = RegisterSchema.safeParse(req.body.user);
  if (!user.success) return res.status(400).json(user.error.issues);
  const { code, resp } = await deleteUserService(id, user.data);
  return res.status(code).json(resp);
};

export const getAllRegisterByUser = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  const { code, resp } = await getAllRegisterByUserService(id);
  return res.status(code).json(resp);

};