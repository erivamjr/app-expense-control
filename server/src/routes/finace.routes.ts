import { getList, createTransaction, updateTransactions, deleteTransactions } from "../controllers/finance.control";
import { authenticatorJwt } from "../middlewares/auth";
import { Router } from "express";

const router = Router();

router.get('/transactions', authenticatorJwt, getList);
router.post('/transactions', authenticatorJwt, createTransaction);
router.put('/transactions/:id', authenticatorJwt, updateTransactions);
router.delete('/transactions/:id', authenticatorJwt, deleteTransactions);

export default router;