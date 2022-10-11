import { Request, Response } from "express";
import { listServiceMovements } from "../services/finance.serv";

const getList = async (req: Request, res: Response) => {
  const result = await listServiceMovements();
  return res.status(200).json(result);
}

export { getList };