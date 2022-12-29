import { createUser } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.post('/register', createUser);

export default router;