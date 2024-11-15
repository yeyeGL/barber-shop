/* eslint-disable react/prop-types */
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomePrincipal from '../screens/home/HomePrincipal';
import HomeAdmin from '../screens/home/HomeAdmin';
import HomeBarber from '../screens/home/HomeBarber';
import HomeUser from '../screens/home/HomeUser';
import Register from '../screens/register/Register';
import Login from '../screens/login/Login';
import Profile from '../screens/profile/Profile';
import Unauthorized from '../components/Unauthorized';
import CreateReserve from '../components/user/CreateReserve';
import MyReserve from '../components/user/MyReserve';  
import AllBarbers from '../components/admin/AllBarbers';
import AllUsers from '../components/admin/AllUsers';
import AllAdmins from '../components/admin/AllAdmins';
import AllReserve from '../components/admin/AllReserve';

// Rutas privadas con token de acceso
const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // Verificar que el token y el rol del usuario sean iguales
  if (!token || userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

const Rutas = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/create-reserve" element={<CreateReserve />} />
        <Route path="/my-reserve" element={<MyReserve />} />

        <Route path="/all-barbers" element={<AllBarbers />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/all-admins" element={<AllAdmins />} />
        <Route path="/all-reserves" element={<AllReserve />} />
        
        {/* Rutas privadas con token de acceso */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><HomeAdmin /></ProtectedRoute>} />
        <Route path="/barber" element={<ProtectedRoute role="barber"><HomeBarber /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute role="user"><HomeUser /></ProtectedRoute>} />

        {/* Rutas privadas sin token de acceso */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rutas;
