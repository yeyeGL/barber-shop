import { Router } from "express";
import {
  deleteAdmin,
} from "../controllers/admin.controllers.js";

import { verifyToken, verifyAdmin } from "../middleware/jwt.middleware.js";

const router = Router();

// Rutas para eliminar un usuario
router.delete("/delete-admin/:id_user",verifyToken, verifyAdmin, deleteAdmin);

export default router;