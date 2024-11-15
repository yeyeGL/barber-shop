import { Router } from "express";
import {
  verifyToken,
  verifyAdmin,
  verifyUser,
  verifyBarber,
} from "../middleware/jwt.middleware.js";
import { register, login, profile } from "../controllers/user.controllers.js";
import { getAllRolBarbers } from "../controllers/user.get.controllers.js";

const router = Router();

// Rutas generales
router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, profile);
router.get("/all-barbers", getAllRolBarbers);

// Rutas especificas por rol
router.get("/admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Bienvenido Admin" });
});

router.get("/user", verifyToken, verifyUser, (req, res) => {
  res.json({ message: "Bienvenido Usuario" });
});

router.get("/barber", verifyToken, verifyBarber, (req, res) => {
  res.json({ message: "Bienvenido Barbero" });
});

export default router;
