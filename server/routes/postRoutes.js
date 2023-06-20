import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postCtrl";
import { admin, auth } from "../middlewares/auth";

const router = Router();

router.post("/posts", auth, admin, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:slug", getPost);
router.put("/posts/:slug", auth, admin, updatePost);
router.delete("/posts/:slug", auth, admin, deletePost);

export default router;
