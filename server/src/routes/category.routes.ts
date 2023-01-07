import { createCategory, getAllCategories } from '../controllers/category.control';
import { Router } from 'express';
import { authenticatorJwt } from '../middlewares/auth';

const router = Router();

router.get('/category', authenticatorJwt, getAllCategories);
router.post('/category', authenticatorJwt, createCategory);

export default router;
