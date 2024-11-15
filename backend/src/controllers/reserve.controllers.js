import { ReserveModel } from "../models/reserve.models.js";

// Crear una nueva reserva
export const createReservation = async (req, res) => {
  // Validar datos del usuario
  const { id_user, id_barber, reservation_date, reservation_time } = req.body;

  // Verificar que los datos sean enviados
  if (!id_user || !id_barber || !reservation_date || !reservation_time) {
    return res.status(400).json({ message: "Faltan datos para crear reserva" });
  }


  try {
    const create = await ReserveModel.createReserve(
      // Crear la reserva
      id_user,
      id_barber,
      reservation_date,
      reservation_time
    );
    // Devolver los datos de la reserva creada y el mensaje de confirmacion
    return res.status(201).json({
      message: "Reserva creada exitosamente",
      create,
    });
  } catch (error) {
     // Si ocurre un error especialmente por datos duplicados
     if (error.message === "Ya existe una reserva con este barbero para esta fecha y hora") {
      return res.status(400).json({ message: error.message });  
    }
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al crear reserva:", error);
    return res.status(500).json({ message: "Error al crear reserva" });
  }
};

// Actualizar una reserva
export const updateReservation = async (req, res) => {
 // Validar datos del usuario
  const { id_user, id_barber, reservation_date, reservation_time } = req.body;
  // Enviar id de la reserva como parametro
  const {id_reserve} = req.params


  // Verificar que los datos sean enviados
  if (!id_reserve || !id_user || !id_barber || !reservation_date || !reservation_time) {
    return res.status(400).json({ message: "Faltan datos para actualizar reserva" });
  }

  try {
    const update = await ReserveModel.updateReserve(
      // Actualizar la reserva
      id_reserve,
      id_user,
      id_barber,
      reservation_date,
      reservation_time
    );
    // Devolver los datos de la reserva actualizada y el mensaje de confirmacion
    return res.status(200).json({
      message: "Reserva actualizada exitosamente",
      update,
    });
  } catch (error) {
      // Si ocurre un error especialmente por datos duplicados
      if (error.message === "Ya existe una reserva con este barbero para esta fecha y hora") {
        return res.status(400).json({ message: error.message });  
      }
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al actualizar reserva:", error);
    return res.status(500).json({ message: "Error al actualizar reserva" });
  }
};

// Eliminar una reserva
export const deleteReservation = async (req, res) => {
  // Enviar id de la reserva como parametro
  const { id_reserve } = req.params;

  // Verificar que los datos sean enviados
  if (!id_reserve) {
    return res.status(400).json({ message: "Faltan datos para eliminar reserva" });
  }

  try {
    // Eliminar la reserva
    const deletee = await ReserveModel.deleteReserve(id_reserve);
    // Devolver los datos de la reserva eliminada y el mensaje de confirmacion
    return res.status(200).json({
      message: "Reserva eliminada exitosamente",
      deletee,
    });
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al eliminar reserva:", error);
    return res.status(500).json({ message: "Error al eliminar reserva" });
  }
};

// Obtener todas las reservas
export const getReservations = async (req, res) => {
  try {
    // Obtener todas las reservas
    const reservations = await ReserveModel.getAllReserve();
    // Devolver los datos de las reservas y el mensaje de confirmacion
    return res.status(200).json({
      message: "Todas las reservas obtenidas exitosamente",
      reservations,
    });
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todas las reservas:", error);
    return res.status(500).json({ message: "Error al obtener todas las reservas" });
  }
};

// Obtener todas las reservas de un usuario
export const getReservationsByUser = async (req, res) => {
  // Envair el id de usuario como parametro
  const { id_user } = req.params;

  // Verificar que los datos sean enviados
  if (!id_user) {
    return res.status(400).json({ message: "Faltan datos para obtener reservas de un usuario" });
  }

  try {
    // Obtener las reservas de un usuario
    const reservations = await ReserveModel.getReserveByUser(id_user);
    // Devolver los datos de las reservas y el mensaje de confirmacion
    return res.status(200).json({
      message: "Todas las reservas obtenidas exitosamente por el usuario",
      reservations,
    });
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todas las reservas:", error);
    return res.status(500).json({ message: "Error al obtener todas las reservas" });
  }
};