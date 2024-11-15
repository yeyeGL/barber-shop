import { UserGetModel } from "../models/user.get.models.js";

// Obtener todos los usuarios con su respectivo rol 'user'
export const getAllRolUser = async (req, res) => {
  try {
    // Obtener todos los usuarios con role 'user'
    const users = await UserGetModel.getAllRolUser();
    // Devolver los datos de los usuarios y el mensaje de confirmacion
    return res.status(200).json({
      message: "Obtenidos todos los usuarios con role 'user'",
      users,
    });
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todos los usuarios con role 'user':", error);
    return res.status(500).json({ message: "Error al obtener todos los usuarios con role 'user'" });
  }
};

// Obtener todos los usuarios con su respectivo rol
export const getAllRolBarbers = async (req, res) => {
  try {
    // Obtener todos los usuarios con role 'barber'
    const users = await UserGetModel.getAllRolBarbers();
    // Devolver los datos de los usuarios y el mensaje de confirmacion
    return res.status(200).json({
      message: "Obtenidos todos los usuarios con role 'barber'",
      users,
    });
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todos los usuarios con role 'barber':", error);
    return res.status(500).json({ message: "Error al obtener todos los usuarios con role 'barber'" });
  }
};

// Obtener todos los usuarios con su respectivo rol
export const getAllRolAdmins = async (req, res) => {
  try {
    // Obtener todos los usuarios con role 'admin'
    const users = await UserGetModel.getAllRolAdmins();
    // Devolver los datos de los usuarios y el mensaje de confirmacion
    return res.status(200).json({
      message: "Obtenidos todos los usuarios con role 'admin'",
      users,
    });
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todos los usuarios con role 'admin':", error);
    return res.status(500).json({ message: "Error al obtener todos los usuarios con role 'admin'" });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios
    const users = await UserGetModel.getAllUsers();
    // Devolver los datos de los usuarios y el mensaje de confirmacion
    return res.status(200).json({
      message: "Obtenidos todos los usuarios en general",
      users,
    });
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener todos los usuarios:", error);
    return res.status(500).json({ message: "Error al obtener todos los usuarios" });
  }
};