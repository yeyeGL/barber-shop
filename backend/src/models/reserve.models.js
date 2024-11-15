import { pool } from "../config/db.js";

// Consulta de insert de una nueva reserva
const createReserve = async (idUser,idBarber,reservationDate,reservationTime) => {
  try {
    // Query para insertar el nuevo usuario
    const result = await pool.query(
      "INSERT INTO reservations (id_user, id_barber, reservation_date, reservation_time) VALUES ($1, $2, $3, $4) RETURNING *",
      [idUser, idBarber, reservationDate, reservationTime]
    );
    // Devolver el resultado de la consulta
    return result.rows[0];
  } catch (error) {
    // Captura de errores relacionados con la restriccion de unicidad
    if (error.code === '23505') {  // Codigo de error para duplicados (violación de unicidad)
    throw new Error("Ya existe una reserva con este barbero para esta fecha y hora");
    }
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al crear reserva:", error);
    throw new Error("Error al crear reserva");
  }
};

// Consulta de update de una reserva
const updateReserve = async (id_reserve, id_user, id_barber, reservation_date, reservation_time) => {
  try {
    // Query para actualizar la reserva
    const result = await pool.query(
      "UPDATE reservations SET id_user = $1, id_barber = $2, reservation_date = $3, reservation_time = $4 WHERE id_reserve = $5 RETURNING *",
      [id_user, id_barber, reservation_date, reservation_time, id_reserve]
    );
    // Devolver el resultado de la consulta
    return result.rows[0];
  } catch (error) {
     // Captura de errores relacionados con la restriccion de unicidad
     if (error.code === '23505') {  // Codigo de error para duplicados (violación de unicidad)
      throw new Error("Ya existe una reserva con este barbero para esta fecha y hora");
      }
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al actualizar reserva:", error);
    throw new Error("Error al actualizar reserva");
  }
};

// Consulta de delete de una reserva
const deleteReserve = async (id_reserve) => {

  try {
    // Query para eliminar la reserva
    const result = await pool.query("DELETE FROM reservations WHERE id_reserve = $1 RETURNING *", [id_reserve]);
    // Devolver el resultado de la consulta
    return result.rows[0];
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al eliminar reserva:", error);
    throw new Error("Error al eliminar reserva");
  }
};

// Consulta de obtener todas las reservas
const getAllReserve = async () => {
  try {
    // Query para obtener todas las reservas
    const result = await pool.query(`
      SELECT 
        r.id_reserve,
        u.name AS user_name,
        b.name AS barber_name,
        r.reservation_date,
        r.reservation_time
      FROM 
        reservations r
      JOIN 
        users u 
        ON r.id_user = u.id_user
      LEFT JOIN 
        users b 
        ON r.id_barber = b.id_user
      ORDER BY 
        r.reservation_date ASC, r.reservation_time ASC;
      `);
    // Devolver el resultado de la consulta
    return result.rows;
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todas las reservas:", error);
    throw new Error("Error al obtener todas las reservas");
  }
};

// Consulta para obtener reservas por usuario
const getReserveByUser = async (id_user) => {
  try {
    // Query para obtener todas las reservas por el usuario
    const result = await pool.query(`
      SELECT 
        b.name AS barber_name,
        r.reservation_date,
        r.reservation_time
      FROM 
        reservations r
      JOIN 
        users u 
        ON r.id_user = u.id_user
      LEFT JOIN 
        users b 
        ON r.id_barber = b.id_user
      WHERE 
        r.id_user = $1
      ORDER BY 
       r.reservation_date ASC, r.reservation_time ASC`, 
    [id_user]);
    // Devolver el resultado de la consulta
    return result.rows;
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todas las reservas:", error);
    throw new Error("Error al obtener todas las reservas");
  }
};

export const ReserveModel = {
  createReserve,
  updateReserve,
  deleteReserve,
  getAllReserve,
  getReserveByUser
};