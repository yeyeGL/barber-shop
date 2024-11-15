import { useNavigate } from "react-router-dom";

const HomePrincipal = () => {

  const redirect = useNavigate();
  
  const handleNavigate = (path) => {
    redirect(path);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    redirect("/");
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl mb-8">Home Principal</h1>

      <div className="flex space-x-4"> 
        <button className="button" onClick={() => handleNavigate("/login")}>login</button>
        <button className="button" onClick={() => handleNavigate("/register")}>register</button>
        <button className="button" onClick={() => handleNavigate("/admin")}>admin</button>
        <button className="button" onClick={() => handleNavigate("/user")}>user</button>
        <button className="button" onClick={() => handleNavigate("/barber")}>barber</button>
        <button className="button" onClick={() => handleLogout()}>logout</button>
      </div>
    </div>
  );
};

export default HomePrincipal;
