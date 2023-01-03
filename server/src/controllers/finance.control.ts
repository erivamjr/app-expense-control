import { Request, Response } from "express";
import { createServiceTransaction, deleteServiceTransaction, listServiceMovements, updateServiceTransaction } from "../services/finance.serv";

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

export const updateTransactions = async (req: Request, res: Response) => {
  const transaction = req.body;
  const { id: userId } = req.body.user;
  const { id } = req.params;

  const { code, resp } = await updateServiceTransaction(transaction, id, userId);
  return res.status(code).json(resp);
}

export const deleteTransactions = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = req.body.user;

  const { code, resp } = await deleteServiceTransaction(id, userId);
  return res.status(code).json(resp);
}