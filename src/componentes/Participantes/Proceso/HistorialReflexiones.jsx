import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HistorialReflexiones.css";

const API_URL = import.meta.env.VITE_API_URL;

function HistorialReflexiones() {
  const [reflexiones, setReflexiones] = useState([]);
  const [expandidas, setExpandidas] = useState({});
  const navigate = useNavigate()

  const fetchReflexiones = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const res = await axios.get(`${API_URL}/reflexion/usuario/${user.id}`);
      setReflexiones(res.data);
    } catch (err) {
      console.error("Error al obtener reflexiones:", err);
    }
  };

  const toggleExpand = (id) => {
    setExpandidas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompartir = async (reflexion) => {
    try {
      await axios.patch(`${API_URL}/reflexion/${reflexion.id}/compartir`, {
        compartirConTerapeuta: !reflexion.compartirConTerapeuta,
      });
      fetchReflexiones();
    } catch (err) {
      console.error("Error al actualizar compartir:", err);
    }
  };

  useEffect(() => {
    fetchReflexiones();
  }, []);

  return (
    <div className="historial-container">
      <header className="historial-header">
        <h2>Historial de Reflexiones</h2>
      </header>

      <main className="historial-main">
        {reflexiones.length === 0 ? (
          <p>No has registrado reflexiones aún.</p>
        ) : (
          <div className="reflexiones-list">
            {reflexiones.map((reflexion) => (
  <div key={reflexion.id} className="reflexion-card">
    <p><strong>Día</strong> {reflexion.fecha}</p>
    
    {/* Texto con clase para truncar/limitar */}
    <p className="reflexion-texto">
      <strong>Reflexión:</strong> {reflexion.texto}
    </p>

    {reflexion.audio_url && (
      <audio controls src={reflexion.audio_url}></audio>
    )}

    {/* Botones de acción */}
    <button
      onClick={() => {
        localStorage.setItem("reflexionId", reflexion.id);
        navigate("/editar-reflexiones");
      }}
    >
      ✏️ Editar
    </button>

    <button
      onClick={async () => {
        const confirmacion = confirm("¿Estás seguro que deseas eliminar esta reflexión?");
        if (confirmacion) {
          try {
            await axios.delete(`${API_URL}/reflexion/${reflexion.id}`);
            alert("Reflexión eliminada");
            setReflexiones(reflexiones.filter(r => r.id !== reflexion.id));
          } catch (err) {
            console.error("Error al eliminar:", err);
            alert("Error al eliminar reflexión");
          }
        }
      }}
    >
      🗑 Eliminar
    </button>
  </div>
))}
          </div>
        )}

        <Link to="/dashboard-participante">
          <button className="volver-btn">Regresar</button>
        </Link>
      </main>

      <footer className="historial-footer">
        <p>Desarrollado por Jesu Guzman</p>
      </footer>
    </div>
  );
}

export default HistorialReflexiones;
