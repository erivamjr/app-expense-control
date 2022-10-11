import { listServiceMovements } from "../services/finance.serv";


const getList = async (req, res) => {
  const result = await listServiceMovements();
  return res.status(200).json(result);
}

export { getList };