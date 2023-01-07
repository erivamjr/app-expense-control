import { createUser, deleteUser, getAllRegisterByUser } from "../controllers/user.controller";
import { Router } from "express";
import { authenticatorJwt } from "../middlewares/auth";

const router = Router();

router.get('/register', authenticatorJwt, getAllRegisterByUser);
router.post('/register', createUser);
router.delete('/register/:id', authenticatorJwt, deleteUser);

export default router;