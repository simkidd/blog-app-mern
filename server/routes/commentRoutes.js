import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createCommit,
  deleteComment,
  updateComment,
} from "../controllers/commentCtrl";

const router = Router();

router.post("/comments", auth, createCommit);
router.put("/comments/:commentId", auth, updateComment);
router.delete("/comments/:commentId", auth, deleteComment);

export default router;
