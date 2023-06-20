import { Router } from "express";
import { auth, admin } from "../middlewares/auth";
import {
  getAllUsers,
  getUser,
  updateUserProfile,
  userProfile,
  deleteUser,
  deleteUserProfile,
  updateUser,
} from "../controllers/userCtrl";

const router = Router();

// get all users admin
router.get("/users", auth, admin, getAllUsers);
// get a admin
router.get("/users/:id", auth, admin, getUser);
// update a user admin
router.put("/users/:id", auth, admin, updateUser);
// delete user admin
router.delete("/users/:id", auth, admin, deleteUser);

// get user profile
router.get("/profile", auth, userProfile);
// update user profile
router.put("/profile", auth, updateUserProfile);
// delete user profile
router.delete("/profile", auth, deleteUserProfile);

export default router;
