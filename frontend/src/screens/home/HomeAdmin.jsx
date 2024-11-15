import Profile from "../profile/Profile";
import { useNavigate } from "react-router-dom";

const HomeAdmin = () => {
  const redirect = useNavigate();

  const handleNavigate = (path) => {
    redirect(path);
  };
  return (
    <div>
      <Profile />
      <div className="flex flex-col items-center justify-center text-center mt-8">
        <h1 className="text-3xl mb-8">Home Admin</h1>

        <div className="flex space-x-4">
          <button className="button" onClick={() => handleNavigate("/all-admins")}>All Admins</button>
          <button className="button"onClick={() => handleNavigate("/all-users")}> All Users</button>
          <button className="button" onClick={() => handleNavigate("/all-barbers")}>All Barber</button>
          <button className="button"onClick={() => handleNavigate("/all-reserves")}>All Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
