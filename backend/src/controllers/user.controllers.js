import { UserModel } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registro de usuario
export const register = async (req, res) => {
  // Validar los datos del usuario
  const { name, email, password, telephone, role } = req.body;

  // Validar que los datos sean enviados
  if (!name || !email || !password || !telephone || !role) {
    return res.status(400).json({ message: "Faltan campos por rellenar" });
  }

  // Validar que el rol sea uno de los permitidos
  const allowedRoles = ['admin', 'user', 'barber'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Rol inválido. Solo 'admin', 'user', o 'barber' son permitidos" });
  }

  try {
    // Validar que el email no esté repetido
    const emailExists = await UserModel.emailExisting(email);
    if (emailExists) {
      return res.status(409).json({ message: "El email ya está ocupado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crear el nuevo usuario
    const newUser = await UserModel.createUser(name, email, hashedPassword, telephone, role);

    // Crear el token JWT
    const token = jwt.sign({ email: newUser.email, role: newUser.role, id_user: newUser.id_user }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Devolver los datos del usuario y el token JWT y el mensaje de confirmación
    return res.status(201).json({
      message: "Usuario creado exitosamente",
      user: newUser,
      token,
    });
  } catch (error) {
    // Si ocurre algún error, enviar el mensaje de error
    console.log("Error al crear el usuario:", error);
    return res.status(500).json({ message: "Error al crear el usuario" });
  }
};

// Autenticacion de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validar que los datos sean enviados
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan campos por rellenar" });
  }

  try {
    const user = await UserModel.emailExisting(email);
    if (!user) {
      return res.status(404).json({ message: "El email no existe" });
    }

    // Validar contraseña
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const allowedRoles = ['admin', 'user', 'barber'];
    if (!allowedRoles.includes(user.role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const token = jwt.sign({ email: user.email, role: user.role, id_user: user.id_user }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Redirigir dependiendo del rol
    let redirectUrl = '';
    if (user.role === 'admin') {
      redirectUrl = '/admin/account';
    } else if (user.role === 'user') {
      redirectUrl = '/user/account';
    } else if (user.role === 'barber') {
      redirectUrl = '/barber/account';
    }

    return res.status(200).json({
      message: "Usuario autenticado exitosamente",
      user,
      token,
      redirectUrl,
    });
  } catch (error) {
    console.log("Error al autenticar el usuario:", error);
    return res.status(500).json({ message: "Error al autenticar el usuario" });
  }
};

// Obtener perfil del usuario
export const profile = async (req, res) => {
  try {
    // Validar que el email del usuario existe
    const user = await UserModel.emailExisting(req.email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Enviar el mensaje de confirmacion
    return res.status(200).json({
      message: "Perfil del usuario",
      user,
    });
  } catch (error) {
    // Si ocurre algun error enviar el mensaje de error
    console.log("Error al obtener el perfil del usuario:", error);
    return res.status(500).json({ message: "Error al obtener el perfil del usuario" });
  }
};