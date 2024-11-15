import { useEffect, useState } from "react";
import axios from "axios";
import { showError } from "../../utils/Alerts";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          showError("Todos los Admins Error", "Debes iniciar sesion");
        }

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/get/get-all-admin-role`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdmins(res.data.users);
        console.log(res.data);
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMsg = error.response.data.message || error.response.data.errors || "Error desconocido";
          // Pasamos el error al showError que manejara arrays y mensajes simples
          showError("Todos los Admins Error", errorMsg);
        } else {
          showError("Todos los Admins Error", "Hubo un problema con la solicitud");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return <p className="text-center text-purple-600">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container-main-general">
      <h1 className="tittle-screen-general">Todos los Admins</h1>
      <table className="container-table-general">
        <thead className="container-thead-general">
          <tr>
            <th className="container-tbody-general">Id Usuario</th>
            <th className="container-tbody-general">Nombre</th>
            <th className="container-tbody-general">Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id_user}>
              <td className="container-tbody-general">{admin.id_user}</td>
              <td className="container-tbody-general">{admin.name}</td>
              <td className="container-tbody-general">{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAdmins;
