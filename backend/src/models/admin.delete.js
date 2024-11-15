import { pool } from "../config/db.js";

// Consulta de eliminacion de un usuario
const deleteAdmin = async (id_user) => {
  try {
    // Query para eliminar el usuario
    const result = await pool.query("DELETE FROM users WHERE id_user = $1", [id_user]);
    // Devolver el resultado de la consulta
    return result.rows;
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al eliminar usuario:", error);
    throw new Error("Error al eliminar usuario");
  }
};

export const AdminDeleteModel = {
  deleteAdmin,
};