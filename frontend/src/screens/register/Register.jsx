import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {showSuccess , showError} from "../../utils/Alerts";

const Register = () => {

  // Utilizamos useNavigate para redireccionar
  const redirect = useNavigate();

  // Funcion para redireccionar
  const handleNavigate = (path) => {
    redirect(path);
  };

  // Utilizamos useForm para crear un formulario y controlar las validaciones de los campos
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Guardamos los mensajes de error en un array
  const errorMessages = Object.values(errors).map((error) => error.message);

  // Función para enviar el formulario
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`,data );
      // Guardamos el token en localStorage
      localStorage.setItem("token", response.data.token);
      redirect("/login");

      // Mostramos un mensaje de alerta de tipo success
      showSuccess("Registro Exitoso", "Has registrado exitosamente");
      reset();

    } catch (error) {
      
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.message || error.response.data.errors || "Error desconocido";
        // Pasamos el error al showError que manejara arrays y mensajes simples
        showError("Register Error", errorMsg);
      } else {
        showError("Register Error", "Hubo un problema con la solicitud");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl text-center text-gray-800 font-bold">Registro</h1>

        {/* Formulario para el registro de usuario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Campo para el nombre del usuario */}
          <div>
            <input
              type="text"
              placeholder="Nombre"
              {...register("name", {
                required: "El Nombre es requerido",
                minLength: {
                  value: 2,
                  message: "Nombre no puede ser menor a 2 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "Nombre no puede ser mayor a 20 caracteres",
                },
              })}
              className="input-register"
            />
          </div>

          {/* Campo para el email del usuario */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message:
                    "Formato de email incorrecto verifica que contenga el @",
                },
              })}
              className="input-register"
            />
          </div>

          {/* Campo para la contraseña del usuario */}
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es requerido",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              className="input-register"
            />
          </div>

          {/* Campo para el telefono del usuario */}
          <div>
            <input
              type="text"
              placeholder="Telefono"
              {...register("telephone", {
                required: "El telefono es requerido",
                minLength: {
                  value: 10,
                  message: "El telefono debe tener al menos 10 caracteres",
                },
              })}
              className="input-register"
            />
          </div>

          {/* Campo para seleccionar el rol del usuario */}
          <div>
            <select
              {...register("role", {
                required: "Seleccionar un rol es requerido",
              })}
              className="input-register"
            >
              <option value="admin">Admin</option>
              <option value="user">Cliente</option>
              <option value="barber">Barbero</option>
            </select>
          </div>

          {/* Mostramos los mensajes de error si hay alguno */}
          {errorMessages.length > 0 && (
            <div className="text-red-500">
              {errorMessages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
          )}
          <button type="submit"  className="button-register" >Registrar</button>
          <button className="font-semibold w-full" onClick={() => handleNavigate("/login")}>Volver al Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
