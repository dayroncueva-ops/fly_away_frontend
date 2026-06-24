import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import FlySearch from "./page/FlySearch";
import Login from "./page/login";
import MyBookings from "./page/MyBookings";
import Register from "./page/register";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Fly Away</p>
          <h1>Reserva de vuelos</h1>
        </div>

        {userName && <p className="user-label">Hola, {userName}</p>}
      </header>

      <nav className="app-nav" aria-label="Navegacion principal">
        <Link to="/register">Registro</Link>
        <Link to="/login">Login</Link>
        <Link to="/flights">Busqueda</Link>
        <Link to="/my-bookings">Mis reservas</Link>

        {token && (
          <button type="button" onClick={logout}>
            Cerrar sesion
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flights" element={<FlySearch />} />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
