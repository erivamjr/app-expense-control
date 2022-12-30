import { client } from '../config/connections';

export const listMovements = async () => {
  const result = await (await client).query('SELECT * FROM finance') as any;
  return result.rows;
};

export const createTransaction = async (title: string, type: string, amount: number, category: string, id: string) => {
  const result = await (await client).query('INSERT INTO finance (title, type, amount, category, created_at, id_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [title, type, amount, category, new Date(), id]) as any;

  return result.rows;
}

export const updateTransaction = async (title: string, type: string, amount: number, category: string, id: string, userId: string) => {
  const result = await (await client).query('UPDATE finance SET title = $1, type = $2, amount = $3, category = $4 WHERE id = $5 AND id_user = $6 RETURNING *', [title, type, amount, category, id, userId]) as any;

  return result.rows;
}
