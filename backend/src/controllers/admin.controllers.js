import { AdminDeleteModel } from "../models/admin.delete.js";

// Eliminar un usuario
export const deleteAdmin = async (req, res) => {
  // Enviar id de la reserva como parametro
  const { id_user } = req.params;

  // Verificar que los datos sean enviados
  if (!id_user) {
    return res.status(400).json({ message: "Faltan datos para eliminar usuario" });
  }

  try {
    // Eliminar la reserva
    const deletee = await AdminDeleteModel.deleteAdmin(id_user);
    // Devolver los datos de la reserva eliminada y el mensaje de confirmacion
    return res.status(200).json({
      message: "Usuario eliminado exitosamente",
      deletee,
    });
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al eliminar usuario:", error);
    return res.status(500).json({ message: "Error al eliminar usuario" });
  }
};