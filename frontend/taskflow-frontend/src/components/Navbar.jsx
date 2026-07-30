import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        height: "70px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <h2
        style={{
          color: "#059669",
          fontWeight: "700",
        }}
      >
        TaskFlow
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "#374151",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          style={{
            textDecoration: "none",
            color: "#374151",
          }}
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          style={{
            textDecoration: "none",
            color: "#374151",
          }}
        >
          Tasks
        </Link>

        <span
          style={{
            color: "#111827",
            fontWeight: "600",
          }}
        >
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;