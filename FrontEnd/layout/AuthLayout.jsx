import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";

export default function AuthLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <nav>
        <button onClick={logout}>Logout</button>
      </nav>
      <Outlet />
    </>
  );
}
