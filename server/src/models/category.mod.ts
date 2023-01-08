import { pool } from "../config/connections";

export const getAllCategoriesModel = async () => {
  const result = await pool.query(`SELECT * FROM categories`) as any;
  await pool.end();
  return result.rows;
};

export const createCategoryModel = async (category: string, id: string) => {
  const result = await pool.query(
    `INSERT INTO 
      categories (category, user_id) 
    VALUES ($1, $2) 
    RETURNING *`,
    [category, id]) as any;
  await pool.end();
  return result.rows;
};