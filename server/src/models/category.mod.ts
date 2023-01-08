import { pool } from "../config/connections";

export const getAllCategoriesModel = async () => {
  const { rows } = await pool.query(`SELECT * FROM categories`) as any;
  return rows;
};

export const createCategoryModel = async (category: string, id: string) => {
  const { rows } = await pool.query(
    `INSERT INTO 
      categories (category, user_id) 
    VALUES ($1, $2) 
    RETURNING *`,
    [category, id]) as any;
  return rows;
};