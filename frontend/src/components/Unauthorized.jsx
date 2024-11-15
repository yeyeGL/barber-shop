import { AlertTriangle, ArrowLeft } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-4 text-red-500">
          <AlertTriangle className="w-16 h-16" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Acceso no autorizado</h1>
        <p className="text-gray-600 mt-4">
          No tienes permisos para ver esta pagina muy avisapadito :;
        </p>
        
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Regresar
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
