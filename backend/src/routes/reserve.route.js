import { Router } from "express";
import {
  createReservation,
  updateReservation,
  deleteReservation,
  getReservations,
  getReservationsByUser,
} from "../controllers/reserve.controllers.js";
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from "../middleware/jwt.middleware.js";

const router = Router();


// Rutas para crear ,update, delete, get reservas por el usuario
router.post("/create-reserve",verifyToken, verifyUser, createReservation);
router.put("/update-reserve/:id_reserve",verifyToken, verifyUser, updateReservation);
router.delete("/delete-reserve/:id_reserve",verifyToken, verifyUser, deleteReservation);
router.get("/get-reserve-by-user/:id_user",verifyToken, verifyUser, getReservationsByUser);

// Ruta para obtener todas las reservas por el admin
router.get("/get-reserve",verifyToken, verifyAdmin, getReservations);
router.delete("/delete-reserve-admin/:id_reserve",verifyToken, verifyAdmin, deleteReservation);

export default router;
