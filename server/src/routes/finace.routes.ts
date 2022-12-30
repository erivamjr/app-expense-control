import { getList, createTransaction, updateTransactions } from "../controllers/finance.control";
import { authenticatorJwt } from "../middlewares/auth";
import { Router } from "express";

const router = Router();

router.get('/transactions', authenticatorJwt, getList);
router.post('/transactions', authenticatorJwt, createTransaction);
router.put('/transactions/:id', authenticatorJwt, updateTransactions);

export default router;