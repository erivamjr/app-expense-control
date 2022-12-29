import { Request, Response } from "express";
import { createServiceTransaction, listServiceMovements } from "../services/finance.serv";

export const getList = async (req: Request, res: Response) => {
  const { code, resp } = await listServiceMovements();
  return res.status(code).json(resp);
}

export const createTransaction = async (req: Request, res: Response) => {
  const transaction = req.body;
  const { id } = req.body.user;

  const { code, resp } = await createServiceTransaction(transaction, id);
  return res.status(code).json(resp);
}
