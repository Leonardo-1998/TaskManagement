import { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router";

export default function LoginCheck() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <nav>
        <div>
          <Link to="/register">Register</Link>
        </div>
        |
        <div>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
