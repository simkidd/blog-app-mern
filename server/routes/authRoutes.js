import { Router } from "express";
import { login, register } from "../controllers/authCtrl";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
