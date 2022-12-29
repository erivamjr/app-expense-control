import { client } from '../config/connections';

export const listMovements = async () => {
  const result = await (await client).query('SELECT * FROM finance') as any;
  return result.rows;
};

export const createTransaction = async (title: string, type: string, amount: number, category: string, id: string) => {
  const result = await (await client).query('INSERT INTO finance (title, type, amount, category, created_at, id_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [title, type, amount, category, new Date(), id]) as any;

  return result.rows;
}
