import { Request, Response } from "express";
import { loginService } from "../services/login.serv";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return { resp: { message: 'All fields must be filled' }, code: 400 };

  const { resp, code } = await loginService(email, password);
  if (!resp) return res.status(code).json(resp);
  return res.status(code).json(resp);
}

// Criar rota para criar categoria
// Rota para Deletar categoria