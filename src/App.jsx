import { Routes, Route } from "react-router-dom";
import Landing from "./componentes/Landing/Landing";
import LoginForm from "./componentes/Login/LoginForm";
import DashboardAdministrador from "./componentes/Administradores/DashboardAdmin";
import DashboardParticipante from "./componentes/Participantes/DashboardParticipante";
import PrivateRoute from "./componentes/PrivateRoute";
import ParticipanteForm from "./componentes/Administradores/PartipanteForm/ParticipanteForm";
import ReflexionForm from "./componentes/Participantes/ReflexionForm/ReflexionForm";
import HistorialReflexiones from "./componentes/Participantes/Proceso/HistorialReflexiones";

function App() {
  return (
    <div className="app-container">
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />
          
          <Route
            path="/dashboard-administrador"
            element={
              <PrivateRoute requiredRole="admin"> 
                <DashboardAdministrador />
              </PrivateRoute>
            }
          />
          <Route path="/registro-participante" element={<ParticipanteForm/>}/>

          <Route
            path="/dashboard-participante"
            element={
              <PrivateRoute requiredRole="participante">
                <DashboardParticipante />
              </PrivateRoute>
            }
          />
           <Route path="/registro-reflexion" element={<ReflexionForm/>}/>
           <Route path="/historial-reflexiones" element={<HistorialReflexiones/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
