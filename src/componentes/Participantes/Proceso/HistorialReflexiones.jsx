import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HistorialReflexiones() {
  const [reflexiones, setReflexiones] = useState([]);

  const fetchReflexiones = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const res = await axios.get(`http://localhost:3001/api/reflexion/usuario/${user.id}`);
      setReflexiones(res.data);
    } catch (err) {
      console.error("Error al obtener reflexiones:", err);
    }
  };

  useEffect(() => {
    fetchReflexiones();
  }, []);

  return (
    <div className="container">
      <h2>🧠 Historial de Reflexiones</h2>
      {reflexiones.length === 0 ? (
        <p>No has registrado reflexiones aún.</p>
      ) : (
        <div className="reflexiones-list">
          {reflexiones.map((reflexion) => (
            <div key={reflexion.id} className="card">
              <p><strong>Fecha:</strong> {reflexion.fecha}</p>
              {reflexion.texto && <p><strong>Texto:</strong> {reflexion.texto}</p>}
              {reflexion.audio_url && (
                <audio controls src={reflexion.audio_url}></audio>
              )}
              <div style={{ marginTop: "0.5rem" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={reflexion.compartirConTerapeuta}
                    onChange={async () => {
                      try {
                        await axios.patch(
                          `http://localhost:3001/api/reflexion/${reflexion.id}/compartir`,
                          {
                            compartirConTerapeuta: !reflexion.compartirConTerapeuta,
                          }
                        );
                        fetchReflexiones(); // Refresca el estado
                      } catch (err) {
                        console.error("Error al actualizar compartir:", err);
                      }
                    }}
                  />
                  Compartir con terapeuta
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
         <Link to="/dashboard-participante">
              <button>Regresar</button>
              </Link>
      </div>
    </div>
  );
}

export default HistorialReflexiones;
