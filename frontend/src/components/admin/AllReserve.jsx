import { useEffect, useState } from "react";
import axios from "axios";
import { showSuccess, showError } from "../../utils/Alerts";
import Swal from "sweetalert2";

const AllReserve = () => {
  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchReserves = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showError("Error", "Debes iniciar sesion");
        setLoading(false);
        return;
      }

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reserve/get-reserve`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data && res.data.reservations) {
        setReserves(res.data.reservations);
      } else {
        showError("Error", "No se encontraron reservas");
      }
    } catch (error) {
      showError("Error", "Hubo un problema al obtener las reservas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReserves();
  }, []);

  const deleteReserve = async (id_reserve) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Al eliminar esta reserva, se eliminara de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${import.meta.env.VITE_API_URL}/reserve/delete-reserve-admin/${id_reserve}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showSuccess("Exito", "Reserva eliminada correctamente.");
        setReserves(reserves.filter((reserve) => reserve.id_reserve !== id_reserve));
      } catch (error) {
        showError("Error", "No se pudo eliminar la reserva.", error);
      }
    }
  };

  if (loading) {
    return <p className="text-center text-purple-600">Cargando...</p>;
  }

  return (
    <div className="container-main-general">
      <h1 className="tittle-screen-general">Todas las Reservas</h1>
      <table className="container-table-general">
        <thead className="container-thead-general">
          <tr>
            <th className="container-tbody-general">Id Reserva</th>
            <th className="container-tbody-general">Nombre del Cliente</th>
            <th className="container-tbody-general">Nombre del Barbero</th>
            <th className="container-tbody-general">Fecha de Reserva</th>
            <th className="container-tbody-general">Hora de Reserva</th>
            <th className="container-tbody-general">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reserves.map((reserve) => (
            <tr key={reserve.id_reserve}>
              <td className="container-tbody-general">{reserve.id_reserve}</td>
              <td className="container-tbody-general">{reserve.user_name}</td>
              <td className="container-tbody-general">{reserve.barber_name}</td>
              <td className="container-tbody-general">{formatDate(reserve.reservation_date)}</td>
              <td className="container-tbody-general">{formatTime(reserve.reservation_time)}</td>
              <td className="container-tbody-general text-center">
                <button
                  className="buttons-general-delete"
                  onClick={() => deleteReserve(reserve.id_reserve)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllReserve;
