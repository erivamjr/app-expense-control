import { createUser, deleteUser } from "../controllers/user.controller";
import { Router } from "express";
import { authenticatorJwt } from "../middlewares/auth";

const router = Router();

router.post('/register', createUser);
router.delete('/register/:id', authenticatorJwt, deleteUser);

export default router;