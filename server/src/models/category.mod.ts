import { client } from "../config/connections";

export const getAllCategoriesModel = async () => {
  const result = await (await client).query('SELECT * FROM categories') as any;
  return result.rows;
};

export const createCategoryModel = async (category: string, id: string) => {
  const result = await (await client).query('INSERT INTO categories (category, user_id) VALUES ($1, $2) RETURNING *', [category, id]) as any;
  return result.rows;
};