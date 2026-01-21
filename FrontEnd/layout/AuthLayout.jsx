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
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Task Management</h1>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
