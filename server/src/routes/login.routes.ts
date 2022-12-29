import { login } from "../controllers/login.control";
import { Router } from "express";

const router = Router();

router.post('/login', login);

export default router;