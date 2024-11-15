import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowRightCircle, Calendar, Clock, User,CirclePlus } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import {showSuccess , showError} from "../../utils/Alerts";

const CreateReserve = () => {

  // Utilizamos useNavigate para redireccionar
  const redirect = useNavigate();

  const [barbers, setBarbers] = useState([]); 
  
  // Utilizamos useForm para crear un formulario y controlar las validaciones de los campos
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Funcion para redireccionar
  const handleNavigate = (path) => {
    redirect(path);
  };

  // Funcion para obtener los barberos con useeffect para que solo se cargue una vez
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/all-barbers`);
        setBarbers(response.data.users);
      } catch (error) {
        console.log("Error mostrando los barberos:", error.response?.data || error.message);
      }
    };
    fetchBarbers();
  }, []);


  // Funcion para enviar el formulario
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Verificar que el token exista
      const token = localStorage.getItem("token");

      // Si el token no existe mostramos un mensaje de error
      if (!token) {
        showError("Reserva Error", "Token es requerido");
        return;
      }

      // Extraemos el payload del token
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      // Extraemos el id_user del payload
      const id_user = decodedPayload.id_user;

      // Creamos el objeto de datos para la solicitud y le agregamos el id_user a la peticion
      const requestData = {
        ...data,
        id_user: id_user,
      };

      // Funcion para enviar la solicitud
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/reserve/create-reserve`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      showSuccess("Reserva Creada", "La reserva ha sido creada exitosamente");

      reset();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.message || error.response.data.errors || "Error desconocido";
        // Pasamos el error al showError que manejara arrays y mensajes simples
        showError("Reserva Error", errorMsg);
      } else {
        showError("Reserva Error", "Hubo un problema con la solicitud");
      }
    }
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Crear La Reserva</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            <User className="inline-block mr-2 mb-2" />
            Barbero:
          </label>
          <select
            {...register("id_barber", { required: "Este campo es requerido" })}
            className="input-create-reserve"
          >
            <option value="">Seleccione un barbero</option>
            {Array.isArray(barbers) &&
              barbers.map((barber) => (
                <option key={barber.id_user} value={barber.id_user}>
                  {barber.name}
                </option>
              ))}
          </select>
          {errors.id_barber && <p className="text-red-500 text-sm">{errors.id_barber.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            <Calendar className="inline-block mr-2 mb-2" />
            Fecha de Reserva:
          </label>
          <input
            type="date"
            {...register("reservation_date", { required: "Este campo es requerido" })}
            className="input-create-reserve"
          />
          {errors.reservation_date && <p className="text-red-500 text-sm">{errors.reservation_date.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            <Clock className="inline-block mr-2 mb-2" />
            Hora de Reserva:
          </label>
          <input
            type="time"
            {...register("reservation_time", { required: "Este campo es requerido" })}
            className="input-create-reserve"
          />
          {errors.reservation_time && <p className="text-red-500 text-sm">{errors.reservation_time.message}</p>}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button type="submit" className="buttons-create-reserve-ver-mis-reservas">Crear Reserva
            <CirclePlus className="ml-2" />
          </button>
          <button className="buttons-create-reserve-ver-mis-reservas" 
            onClick={() => handleNavigate("/my-reserve")}>Ver Mis Reservas
            <ArrowRightCircle className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReserve;
