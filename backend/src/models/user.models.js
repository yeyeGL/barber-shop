import { pool } from '../config/db.js';

// Consulta de insert de un nuevo usuario
const createUser = async (name, email, password, telephone, role) => {
  try {
    // Query para insertar el nuevo usuario
    const result = await pool.query(
      'INSERT INTO users (name, email, password, telephone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, password, telephone, role]
    );

    // Devolver el resultado de la consulta
    return result.rows[0];
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.error("Error al crear usuario:", error);
    throw new Error("Error al crear usuario");
  }
};

// Consulta de verificacion de existencia de un usuario por email
const emailExisting = async (email) => {
  try {
    // Query para insertar el nuevo usuario
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // Devolver el resultado de la consulta
    return result.rows[0];
  } catch (error) {
   // Si ocurre algun error enviar el mensaje de error
   console.error("Error al verificar existencia de usuario:", error);
   throw new Error("Error al verificar existencia de usuario");
  }
};

export const UserModel = {
  createUser,
  emailExisting,
};
