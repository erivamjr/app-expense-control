import { listMovements } from "../models/finance.mod";

// interface IList {
//   id: number;
//   title: string;
//   type: string;
//   amount: number;
//   created_at: string;
//   category: string;
// }
const listServiceMovements = async () => {
  const data = await listMovements();
  return data;
};

export { listServiceMovements };