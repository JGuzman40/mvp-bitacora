import { Routes, Route } from "react-router-dom";
import Landing from "../src/componentes/Landing/Landing";
import LoginForm from "../src/componentes/Login/LoginForm";
import DashboardAdministrador from "../src/componentes/Administradores/DashboardAdmin";
import DashboardParticipante from "../src/componentes/Participantes/DashboardParticipante";

function App() {
  return (
    <div className="app-container">
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard-administador" element={<DashboardAdministrador />} />
          <Route path="/dashboard-participante" element={<DashboardParticipante />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;