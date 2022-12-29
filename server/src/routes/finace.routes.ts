import { getList } from "../controllers/finance.control";
import { authenticatorJwt } from "../middlewares/auth";

const express = require('express');

const router = express.Router();

router.get('/transactions', authenticatorJwt, getList);

export default router;