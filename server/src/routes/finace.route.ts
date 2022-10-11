import { getList } from "../controllers/finance.control";

const express = require('express');

const router = express.Router();

router.get('/transactions', getList);

module.exports = router;