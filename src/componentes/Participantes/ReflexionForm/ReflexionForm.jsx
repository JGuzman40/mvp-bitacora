import { useState, useRef } from "react";
import axios from "axios";

function ReflexionForm() {
  const [texto, setTexto] = useState("");
  const [grabando, setGrabando] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const handleStartRecording = async () => {
    setGrabando(true);
    audioChunks.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/ogg" });
      setAudioBlob(audioBlob);
      setAudioURL(URL.createObjectURL(audioBlob));
    };

    mediaRecorder.start();
  };

  const handleStopRecording = () => {
    setGrabando(false);
    mediaRecorderRef.current.stop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    if (audioBlob) formData.append("audio", audioBlob);
    formData.append("texto", texto);
    formData.append("usuarioId", user?.id);
    formData.append("fecha", new Date().toISOString().split("T")[0]); // hoy

for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

    try {
      const response = await axios.post("http://localhost:3001/api/reflexion", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Reflexión guardada con éxito 🙌");
      setTexto("");
      setAudioBlob(null);
      setAudioURL(null);
    } catch (error) {
      console.error("Error al guardar reflexión:", error);
      alert("Hubo un problema al guardar la reflexión");
    }
  };

  return (
    <div className="container">
      <h2>Registrar Reflexión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="texto">Escribe tu reflexión</label>
        <textarea
          id="texto"
          name="texto"
          rows="4"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <div style={{ margin: "1rem 0" }}>
          {!grabando ? (
            <button type="button" onClick={handleStartRecording}>
              🎙️ Iniciar Grabación
            </button>
          ) : (
            <button type="button" onClick={handleStopRecording}>
              🛑 Detener Grabación
            </button>
          )}
        </div>

        {audioURL && (
          <div>
            <p>🎧 Audio grabado:</p>
            <audio controls src={audioURL}></audio>
          </div>
        )}

        <button type="submit">Guardar Reflexión</button>
      </form>
    </div>
  );
}

export default ReflexionForm;
