import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {showSuccess, showError} from "../../utils/Alerts";


const Login = () => {

  // Utilizamos useForm para crear un formulario y controlar las validaciones de los campos
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Guardamos los mensajes de error en un array
  const errorMessages = Object.values(errors).map((error) => error.message);

  // Utilizamos useNavigate para redireccionar
  const redirect = useNavigate();

  // Funcion para redireccionar
  const handleNavigate = (path) => {
    redirect(path);
  };

  // Funcion para enviar el formulario 
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, data);
      
      // Guardamos el token en localStorage y el rol del usuario
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
  
      // Redireccionamos según el rol del usuario
      const role = response.data.user.role;
      if (role === "admin") {
        redirect("/admin");
      } else if (role === "user") {
        redirect("/user");
      } else if (role === "barber") {
        redirect("/barber");
      }

      // Mostramos un mensaje de alerta de tipo success
      showSuccess("Login Exitoso", "Has iniciado sesion exitosamente");
      
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.message || error.response.data.errors || "Error desconocido";
        // Pasamos el error al showError que manejara arrays y mensajes simples
        showError("Login Error", errorMsg);
      } else {
        showError("Login Error", "Hubo un problema con la solicitud");
      }
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl text-center text-gray-800 font-bold"> Inicio de Sesion</h1>

        {/* Formulario para el login de usuario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Campo para el email del usuario */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Formato de email incorrecto verifica que contenga el @",
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

          {/* Mostramos los mensajes de error si hay alguno */}
          {errorMessages.length > 0 && (
            <div className="text-red-500">
              {errorMessages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
          )}
          <button type="submit" className="button-login" >Iniciar Sesion</button>
          <button className="font-semibold w-full"onClick={() => handleNavigate("/register")}>
            Crear una Cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
