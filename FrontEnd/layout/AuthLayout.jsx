import { useEffect } from "react";
import { useNavigate, Outlet, Link } from "react-router";
import { Button } from "@/components/ui/button";

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
      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>

      <Outlet />
    </>
  );
}
