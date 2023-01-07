import { Response, Request } from "express";
import { createCategoryService, getAllCategoriesService } from "../services/category.serv";
import { CategorySchema } from '../schemas/category.sch';

export const getAllCategories = async (req: Request, res: Response) => {
  const { code, resp } = await getAllCategoriesService();
  return res.status(code).json(resp);
}

export const createCategory = async (req: Request, res: Response) => {
  const result = CategorySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.issues);
  }

  const { user: { id }, category } = result.data;

  const { code, resp } = await createCategoryService(category, id);
  return res.status(code).json(resp);

}