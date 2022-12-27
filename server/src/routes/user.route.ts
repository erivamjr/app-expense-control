import { createUser } from "../controllers/user.controller";

const express = require('express');

const router = express.Router();

router.post('/register', createUser);

export default router;