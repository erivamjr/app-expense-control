import { pool } from '../config/connections';

export const listMovements = async () => {
  const { rows } = await pool.query(`SELECT * FROM finance`) as any;
  return rows;
};

export const createTransaction = async (title: string, type: string, amount: number, category: string, id: string) => {
  const { rows } = await pool.query(
    `INSERT INTO 
      finance (title, type, amount, category, created_at, id_user) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`,
    [title, type, amount, category, new Date(), id]) as any;
  return rows;
}

export const updateTransaction = async (title: string, type: string, amount: number, category: string, id: string, userId: string) => {
  const { rows } = await pool.query(
    `UPDATE 
      finance 
    SET title = $1, type = $2, amount = $3, category = $4 
    WHERE id = $5 AND id_user = $6 
    RETURNING *`,
    [title, type, amount, category, id, userId]) as any;
  return rows;
}

export const deleteTransaction = async (id: string, userId: string) => {
  const { rowCount } = await pool.query(
    `DELETE FROM 
      finance WHERE id = $1 AND id_user = $2 
    RETURNING *`,
    [id, userId]) as any;
  return rowCount;
}
