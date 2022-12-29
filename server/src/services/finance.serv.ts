import { createTransaction, listMovements } from "../models/finance.mod";

// interface IList {
//   id: number;
//   title: string;
//   type: string;
//   amount: number;
//   created_at: string;
//   category: string;
// }
export const listServiceMovements = async () => {
  const data = await listMovements();
  if (!data) return { code: 404, resp: { message: 'Error of response try again' } }
  return { code: 200, resp: data };
};

export const createServiceTransaction = async (transaction: any, id: string) => {
  const { title, type, amount, category } = transaction;
  const data = await createTransaction(title, type, amount, category, id);
  if (!data) return { code: 404, resp: { message: 'Error of response try again' } }
  return { code: 201, resp: data };
}