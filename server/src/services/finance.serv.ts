import { createTransaction, deleteTransaction, listMovements, updateTransaction } from "../models/finance.mod";
import { TransactionsType } from "../utils/schemas";

export const listServiceMovements = async () => {
  const data = await listMovements();

  if (!data) return { code: 404, resp: { message: 'Error of response try again' } }
  return { code: 200, resp: data };
};

export const createServiceTransaction = async (transaction: TransactionsType, id: string) => {
  const { title, type, amount, category } = transaction;
  const data = await createTransaction(title, type, amount, category, id);
  if (!data) return { code: 404, resp: { message: 'Error of response try again' } }
  return { code: 201, resp: data };
}

export const updateServiceTransaction = async (transaction: TransactionsType, id: string, userId: string) => {
  const { title, type, amount, category } = transaction;

  if (!userId) return { code: 404, resp: { message: 'Error of response try again with user' } };
  const data = await updateTransaction(title, type, amount, category, id, userId);

  if (!data.length) return { code: 404, resp: { message: 'Error of response try again' } }
  return { code: 200, resp: data };
}

export const deleteServiceTransaction = async (id: string, userId: string) => {
  const data = await deleteTransaction(id, userId);
  if (!data) return { code: 404, resp: { message: 'Error of response try again' } }
  return { code: 204, resp: data };
}