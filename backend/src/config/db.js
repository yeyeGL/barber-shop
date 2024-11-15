import dotenv from "dotenv";
import pg from "pg";

// Cargar las variables de entorno
dotenv.config();

// Crear el pool de conexiones a la base de datos
export const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Crear la tabla 'users' con roles especificos como 'user', 'admin' y 'barber'
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('user', 'admin', 'barber')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Crear la tabla 'reservations' para gestionar las reservas
const createReservationsTable = `
  CREATE TABLE IF NOT EXISTS reservations (
    id_reserve SERIAL PRIMARY KEY,
    id_user INT NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    id_barber INT REFERENCES users(id_user) ON DELETE SET NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_reservation UNIQUE (id_barber, reservation_date, reservation_time)
  );
`;

// Crear todas las tablas en la base de datos
const createTables = async () => {
  try {
    await pool.query(createUsersTable);
    console.log("Tabla 'users' creada exitosamente");
    await pool.query(createReservationsTable);
    console.log("Tabla 'reservations' creada exitosamente");
  } catch (error) {
    console.log("Error en la creacion de las tablas:", error);
  }
};
 


createTables();
