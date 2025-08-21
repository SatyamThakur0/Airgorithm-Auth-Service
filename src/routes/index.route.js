import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/admin/login", userController.adminLogin);
router.get("/admin/logout", userController.adminLogout);

export default router;
