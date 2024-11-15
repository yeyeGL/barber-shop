import { useEffect, useState } from "react";
import axios from "axios";
import { showSuccess, showError } from "../../utils/Alerts";
import Swal from "sweetalert2";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            showError("Todos los Users Error", "Debes iniciar sesion");
          }
  
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/get/get-all-user-role`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsers(res.data.users);
          console.log(res.data);
        } catch (error) {
          if (error.response && error.response.data) {
            const errorMsg = error.response.data.message || error.response.data.errors || "Error desconocido";
            // Pasamos el error al showError que manejara arrays y mensajes simples
            showError("Todos los Users Error", errorMsg);
          } else {
            showError("Todos los Users Error", "Hubo un problema con la solicitud");
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);


    const deleteUser = async (id_user) => {
      const confirmDelete = await Swal.fire({
        title: "¿Estas seguro?",
        text: "Al eliminar este usuario, se eliminara de forma permanente.",
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
          await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete-admin/${id_user}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          showSuccess("Exito", "Al eliminar el usuario");
          setUsers(users.filter((user) => user.id_user !== id_user));
        } catch (error) {
          showError("Error", "No se pudo eliminar el usuario.", error);
        }
      }
    };
  
    if (loading) {
      return <p className="text-center text-purple-600">Cargando...</p>;
    }
  
    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }
  
    return (
      <div className="container-main-general">
        <h1 className="tittle-screen-general">Todos los Users</h1>
        <table className="container-table-general">
          <thead className="container-thead-general">
            <tr>
              <th className="container-tbody-general">id del usuario</th>
              <th className="container-tbody-general">Nombre</th>
              <th className="container-tbody-general">Email</th>
              <th className="container-tbody-general">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_user}>
                <td className="container-tbody-general">{user.id_user}</td>
                <td className="container-tbody-general">{user.name}</td>
                <td className="container-tbody-general">{user.email}</td>
                <td className="container-tbody-general text-center">
                <button
                  className="buttons-general-delete"
                  onClick={() => deleteUser(user.id_user)}
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
  

export default AllUsers