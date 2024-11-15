import { Router } from "express";
import {
  getAllRolUser,
  getAllRolBarbers,
  getAllRolAdmins,
  getAllUsers,
} from "../controllers/user.get.controllers.js";

import { verifyToken, verifyAdmin } from "../middleware/jwt.middleware.js";

const router = Router();

// Rutas para obtener todos los usuarios con su respectivo rol
router.get("/get-all-user-role", verifyToken, verifyAdmin, getAllRolUser);
router.get("/get-all-barber-role", verifyToken, verifyAdmin, getAllRolBarbers);
router.get("/get-all-admin-role", verifyToken, verifyAdmin, getAllRolAdmins);

// Rutas para obtener todos los usuarios en general
router.get("/get-all-users", verifyToken, verifyAdmin, getAllUsers);

export default router;
