import { pool } from "../config/db.js";

// Consultas para obtener todos los usuarios con su respectivo rol y todos los usuarios generales

// Consulta para obtener todos los usuarios con role 'user'
const getAllRolUser = async () => {
  try {
    // Query para obtener todos los usuarios con role 'user'
    const result = await pool.query("SELECT * FROM users WHERE role = 'user'");
    // Devolver el resultado de la consulta
    return result.rows;
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todos los usuarios:", error);
    throw new Error("Error al obtener todos los usuarios");
  }
};

// Consulta para obtener todos los usuarios con role 'barber'
const getAllRolBarbers = async () => {
  try {
    // Query para obtener todos los usuarios con role 'barber'
    const result = await pool.query(
      "SELECT * FROM users WHERE role = 'barber'"
    );
    // Devolver el resultado de la consulta
    return result.rows;
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todos los usuarios:", error);
    throw new Error("Error al obtener todos los usuarios");
  }
};

// Consulta para obtener todos los usuarios con role 'admin'
const getAllRolAdmins = async () => {
  try {
    // Query para obtener todos los usuarios con role 'admin'
    const result = await pool.query("SELECT * FROM users WHERE role = 'admin'");
    // Devolver el resultado de la consulta
    return result.rows;
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todos los usuarios:", error);
    throw new Error("Error al obtener todos los usuarios");
  }
};

// Consulta para obtener todos los usuarios
const getAllUsers = async () => {
  try {
    // Query para obtener todos los usuarios
    const result = await pool.query("SELECT * FROM users");
    // Devolver el resultado de la consulta
    return result.rows;
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todos los usuarios:", error);
    throw new Error("Error al obtener todos los usuarios");
  }
};

export const UserGetModel = {
  getAllRolUser,
  getAllRolBarbers,
  getAllRolAdmins,
  getAllUsers,
};
