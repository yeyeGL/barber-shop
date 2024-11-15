import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const redirect = useNavigate();


  // Estados de carga
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Funcion para obtener el perfil del usuario
  useEffect(() => {

    // Obtener el token del usuario
    const token = localStorage.getItem("token");

    // Verificar que el token exista
    if (!token) {
      setError("No hay token en localStorage por favor inicia sesion");
      setLoading(false);
      return;
    }

    // Funcion para obtener el perfil del usuario
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Asignar el perfil del usuario a la variable user
        setUser(res.data.user); 
        setLoading(false);
      } catch (err) {
        // Si ocurre algun error mostrar un mensaje de error
        console.error("Error fetching perfil:", err);
        redirect("/")
        setError("Error fetching perfil");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p className="text-purple-600 text-center mt-6">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto mt-6">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Usuario Perfil</h1>
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-700">
          <strong className="text-purple-600">Name:</strong> {user?.name}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <strong className="text-purple-600">Email:</strong> {user?.email}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <strong className="text-purple-600">Role:</strong> {user?.role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
