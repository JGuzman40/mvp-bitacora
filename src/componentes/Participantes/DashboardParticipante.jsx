import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardParticipante.css";

function DashboardParticipante() {
  const [participante, setParticipante] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "participante") {
      navigate("/login");
    } else {
      setParticipante(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="participante-dashboard">
      <h2>{participante?.name}</h2>
      <p>Estamos contentos de acompañarte en este proceso personal 🙏</p>
       <h2>Bitacora</h2>
      <div className="acciones-participante">
        <button>Grabar Reflexión</button>
        <button>Proceso</button>
      </div>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default DashboardParticipante;
