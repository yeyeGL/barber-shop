import { useEffect, useState } from "react";
import axios from "axios";
import {showError} from "../../utils/Alerts";

const MyReserve = () => {

  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //Funciones para formatear fecha y hora
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}Z`);
    const hours = String(time.getUTCHours()).padStart(2, "0");
    const minutes = String(time.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  //Funcion para obtener mis reservas
  useEffect(() => {
    const fetchReserves = async () => {
      
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
         showError("Mis Reservas Error", "Debes iniciar sesion");
        }

        // Extraemos el payload del token
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload));
        // Extraemos el id_user del payload
        const id_user = decodedPayload?.id_user;

        // Si el id_user no existe mostramos un mensaje de error
        if (!id_user) {
          showError("Mis Reservas Error", "Token invalido inicia sesion nuevamente");
        }

        // Funcion para obtener mis reservas
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/reserve/get-reserve-by-user/${id_user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data)
        setReserves(res.data.reservations); 
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMsg = error.response.data.message || error.response.data.errors || "Error desconocido";
          // Pasamos el error al showError que manejara arrays y mensajes simples
          showError("Mis Reserva Error", errorMsg);
        } else {
          showError("Mis Reserva Error", "Hubo un problema con la solicitud");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReserves();
  }, []);


  if (loading) return <p className="text-center text-purple-600">Cargando reservas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 mb-12">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-8 mt-8">Mis Reservas</h1>

      <table className="container-table">
 
        <thead>
          <tr className="bg-purple-600 text-white">
            <th className="tittle-table">Barbero</th>
            <th className="tittle-table">Fecha de Reserva</th>
            <th className="tittle-table">Hora de Reserva</th>
            <th className="tittle-table">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {reserves.map((reserve) => (
            <tr key={reserve.id_reserve}>
              <td className="body-table">{reserve.barber_name}</td>
              <td className="body-table"> {formatDate(reserve.reservation_date)}</td>
              <td className="body-table">{formatTime(reserve.reservation_time)}</td>
              <td className="body-table">Eliminar</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default MyReserve;
