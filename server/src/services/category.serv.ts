import { createCategoryModel, getAllCategoriesModel } from '../models/category.mod';

export const getAllCategoriesService = async () => {
  const data = await getAllCategoriesModel();
  if (!data) return { code: 404, resp: { message: 'Error of response try again' } }
  return { code: 200, resp: data };
}

export const createCategoryService = async (category: string, id: string) => {
  const data = await createCategoryModel(category, id);
  if (!data) return { code: 404, resp: { message: 'Error of response try again' } }
  return { code: 200, resp: data };
}