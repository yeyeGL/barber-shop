import jwt from "jsonwebtoken";

// Verificar el token de autenticacion
export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ ok: false, message: "El token es requerido" });
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    req.role = decoded.role;
    decoded;
    next();
  } catch (err) {
    console.log("Error verifying token:", err);
    return res.status(403).json({ ok: false, message: "Token no valido" });
  }
};

// Verificar que el admin tenga el rol 'admin'
export const verifyAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado Solo los administradores pueden acceder" });
  }
  next();
};

// Verificar que el usuario tenga el rol 'user'
export const verifyUser = (req, res, next) => {
  if (req.role !== "user") {
    return res.status(403).json({ message: "Acceso denegado Solo los usuarios pueden acceder" });
  }
  next();
};

// Verificar que el barber tenga el rol 'barber'
export const verifyBarber = (req, res, next) => {
  if (req.role !== "barber") {
    return res.status(403).json({ message: "Acceso denegado Solo los barberos pueden acceder" });
  }
  next();
};

// Verificar que el admin tenga el rol 'admin' o 'barber'
export const verifyAdminOrBarber = (req, res, next) => {
  if (req.role !== "admin" && req.role !== "barber") {
    return res.status(403).json({ message: "Acceso denegado Solo los admins o barberos pueden acceder" });
  }
  next();
};
