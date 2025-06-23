import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./DashboardAdmin.css";

function DashboardAdministrador() {
  const [admin, setAdmin] = useState(null);
  const [participantes, setParticipantes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      setAdmin(user);
      fetchParticipantes(user.id);
    }
  }, [location.pathname]);

  const fetchParticipantes = async (adminId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user/admin/${adminId}/participantes`
      );
      setParticipantes(response.data);
    } catch (error) {
      console.error("Error al obtener participantes:", error);
    }
  };
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-info">
          <h2>{admin?.name}</h2>
          <h5>Dashboard Administración</h5>
        </div>
        <nav className="admin-nav">
          <Link to="/registro-participante">
            <button>Registrar Participante</button>
          </Link>
        </nav>
      </header>

      <section className="admin-content">
        <h3>Participantes registrados</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {participantes.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>
                  <button>Ver perfil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <button className="logout-button" onClick={handleLogout}>
      Cerrar sesión
    </button>

      </section>
    </div>
  );
}

export default DashboardAdministrador;
